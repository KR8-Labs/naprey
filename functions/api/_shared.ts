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
  // Cloudflare Pages env vars) to KR8-Labs/naprey; overridable so local dev
  // (.dev.vars) can safely point at a disposable scratch repo instead.
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  // R2 bucket binding (configured in the Pages project settings, not a string
  // secret) — Functions read/write it directly, no signing needed.
  IMAGES_BUCKET: R2Bucket;
  // Public base URL for the bucket, e.g. a custom domain mapped to it.
  R2_PUBLIC_BASE_URL: string;
  // Shared password gating /admin. A single admin, low-stakes content site
  // (worst case of a leak is vandalized text/images, trivially reverted via
  // git) — a shared secret + signed session cookie is proportionate here;
  // Cloudflare Access's Zero Trust setup was more machinery than this needed.
  ADMIN_PASSWORD: string;
  // HMAC key used to sign the session cookie so it can't be forged.
  SESSION_SECRET: string;
  // LOCAL DEV ONLY — set to 'true' only in a gitignored .dev.vars, never as
  // a real Cloudflare Pages env var. Skips session verification entirely.
  LOCAL_DEV_BYPASS_AUTH?: string;
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

export const SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE_S = 60 * 60 * 24 * 7; // 7 days

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmacHex(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return toHex(sig);
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('Cookie') || '';
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
}

function cookieAttrs(request: Request): string {
  // Cookies over plain http (local `wrangler pages dev`) can't be marked
  // Secure or the browser silently drops them.
  const secure = new URL(request.url).protocol === 'https:' ? ' Secure;' : '';
  return `HttpOnly;${secure} SameSite=Lax; Path=/`;
}

// Builds a fresh signed session cookie value ("<expiryMs>.<hmacHex>"), for
// login.ts to set after a correct password.
export async function createSessionValue(env: Env): Promise<string> {
  const expiresAt = Date.now() + SESSION_MAX_AGE_S * 1000;
  const sig = await hmacHex(String(expiresAt), env.SESSION_SECRET);
  return `${expiresAt}.${sig}`;
}

export function sessionSetCookieHeader(value: string, request: Request): string {
  return `${SESSION_COOKIE}=${value}; ${cookieAttrs(request)}; Max-Age=${SESSION_MAX_AGE_S}`;
}

export function sessionClearCookieHeader(request: Request): string {
  return `${SESSION_COOKIE}=; ${cookieAttrs(request)}; Max-Age=0`;
}

// Shared by the API auth check below and the /admin page gate
// (functions/admin/_middleware.ts) — verifies the cookie's HMAC and expiry.
export async function hasValidSession(request: Request, env: Env): Promise<boolean> {
  if (env.LOCAL_DEV_BYPASS_AUTH === 'true') return true; // local dev only

  const cookie = readCookie(request, SESSION_COOKIE);
  if (!cookie) return false;
  const dot = cookie.indexOf('.');
  if (dot === -1) return false;
  const expiresAtStr = cookie.slice(0, dot);
  const sig = cookie.slice(dot + 1);
  const expected = await hmacHex(expiresAtStr, env.SESSION_SECRET);
  if (sig !== expected) return false;
  return Number(expiresAtStr) > Date.now();
}

// For API routes: short-circuits the handler with a 401 if there's no valid
// session, or returns null to let it proceed.
export async function verifySession(request: Request, env: Env): Promise<Response | null> {
  if (await hasValidSession(request, env)) return null;
  return new Response('Unauthorized — please log in.', { status: 401 });
}
