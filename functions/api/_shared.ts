// Shared helpers for the admin API. Underscore prefix excludes this file from
// Cloudflare Pages Functions' file-based routing (same convention Astro uses).

// Minimal shape of what we use from Cloudflare's R2Bucket binding type —
// avoids pulling in @cloudflare/workers-types just for this one interface.
export interface R2Bucket {
  put(
    key: string,
    value: ArrayBuffer,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<unknown>;
}

export interface Env {
  GITHUB_PAT: string;
  // Repo the admin writes to. Hardcoded in production (via the real
  // Cloudflare Pages env vars) to ygglue/naprey; overridable so local dev
  // (.dev.vars) can safely point at a disposable scratch repo instead.
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  // R2 bucket binding (configured in the Pages project settings, not a string
  // secret) — Functions read/write it directly, no signing needed.
  IMAGES_BUCKET: R2Bucket;
  // Public base URL for the bucket, e.g. "https://pub-xxxx.r2.dev" or a
  // custom subdomain mapped to it.
  R2_PUBLIC_BASE_URL: string;
  // Zero Trust team domain, e.g. "yourteam.cloudflareaccess.com"
  ACCESS_TEAM_DOMAIN: string;
  // The Access Application's Audience (AUD) tag, from its dashboard settings
  ACCESS_AUD: string;
  // LOCAL DEV ONLY — set to 'true' only in a gitignored .dev.vars, never as
  // a real Cloudflare Pages env var. Skips Access verification entirely,
  // since Access is edge-only and can't run under `wrangler pages dev`.
  LOCAL_DEV_BYPASS_ACCESS?: string;
  // LOCAL DEV ONLY — same rule as above. Serves the real src/data/content.json
  // bundled at dev-server start instead of fetching from GitHub, and makes
  // "publish" a no-op success instead of a real commit — lets the full
  // load → edit → publish loop be tested with zero external setup (no
  // scratch repo, no PAT).
  LOCAL_DEV_SAMPLE_CONTENT?: string;
}

export interface FunctionContext {
  request: Request;
  env: Env;
}

// btoa() only handles Latin1 correctly; content.json has em dashes, curly
// quotes, etc. Encode to UTF-8 bytes first, then base64 the byte sequence.
export function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function base64UrlToBytes(b64url: string): Uint8Array {
  const padLen = (4 - (b64url.length % 4)) % 4;
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLen);
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlDecodeToString(b64url: string): string {
  return new TextDecoder().decode(base64UrlToBytes(b64url));
}

// Module-scope cache — persists across requests on a warm Workers isolate.
// Cheap, standard pattern for avoiding a JWKS fetch on every request; falls
// back to a fresh fetch automatically once the isolate recycles or the TTL
// below expires.
let cachedJwks: { keys: JsonWebKey[] } | null = null;
let cachedJwksAt = 0;
const JWKS_TTL_MS = 5 * 60 * 1000;

async function getJwks(teamDomain: string): Promise<{ keys: JsonWebKey[] }> {
  const now = Date.now();
  if (cachedJwks && now - cachedJwksAt < JWKS_TTL_MS) return cachedJwks;
  const res = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error('Could not fetch Access JWKS');
  cachedJwks = (await res.json()) as { keys: JsonWebKey[] };
  cachedJwksAt = now;
  return cachedJwks;
}

// Verifies the request actually passed Cloudflare Access — not just that a
// header with the right name is present (that alone is spoofable by any
// client hitting a hostname/path Access doesn't happen to cover, e.g. the
// project's default *.pages.dev domain). Checks the JWT's RS256 signature
// against Access's own published JWKS, plus audience + expiry.
export async function verifyAccessJwt(request: Request, env: Env): Promise<Response | null> {
  if (env.LOCAL_DEV_BYPASS_ACCESS === 'true') {
    return null; // local dev only — see the Env interface comment above
  }

  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token) {
    return new Response('Unauthorized — missing Access token.', { status: 403 });
  }
  if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
    return new Response('Access verification is not configured on the server.', { status: 500 });
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return new Response('Unauthorized — malformed Access token.', { status: 403 });
  }
  const [headerB64, payloadB64, sigB64] = parts;

  let header: { kid?: string; alg?: string };
  let payload: { aud?: string | string[]; exp?: number };
  try {
    header = JSON.parse(base64UrlDecodeToString(headerB64));
    payload = JSON.parse(base64UrlDecodeToString(payloadB64));
  } catch {
    return new Response('Unauthorized — malformed Access token.', { status: 403 });
  }

  if (header.alg !== 'RS256') {
    return new Response('Unauthorized — unexpected Access token algorithm.', { status: 403 });
  }

  let jwks: { keys: JsonWebKey[] };
  try {
    jwks = await getJwks(env.ACCESS_TEAM_DOMAIN);
  } catch {
    return new Response('Could not verify Access token (JWKS fetch failed).', { status: 502 });
  }

  const jwk = jwks.keys.find((k) => (k as { kid?: string }).kid === header.kid);
  if (!jwk) {
    return new Response('Unauthorized — unknown Access signing key.', { status: 403 });
  }

  const key = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const signedData = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signature = base64UrlToBytes(sigB64);
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signature as BufferSource, signedData);
  if (!valid) {
    return new Response('Unauthorized — Access token signature invalid.', { status: 403 });
  }

  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(env.ACCESS_AUD)) {
    return new Response('Unauthorized — Access token audience mismatch.', { status: 403 });
  }
  if (!payload.exp || payload.exp * 1000 < Date.now()) {
    return new Response('Unauthorized — Access token expired.', { status: 403 });
  }

  return null; // verified — caller proceeds
}
