// POST /api/login — checks the shared admin password and issues a signed
// session cookie. No account system — see the ADMIN_PASSWORD comment in
// _shared.ts for why a shared secret is proportionate here.
//
// Rate-limited per-IP against brute-force guessing — the account's plan has
// no WAF rate-limiting rules available, so this is done in-app instead.
// Module-scope state only persists on a warm isolate (resets on recycle,
// and isn't shared across edge locations), which is weaker than a real
// distributed limiter, but is still a meaningful bar against a naive script
// hammering the endpoint from one place — a reasonable tradeoff given no
// new binding (KV/Durable Objects) is otherwise needed for this admin tool.
import { createSessionValue, sessionSetCookieHeader, type FunctionContext } from './_shared';

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000;

const failedAttemptsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (failedAttemptsByIp.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  failedAttemptsByIp.set(ip, recent);
  return recent.length >= MAX_ATTEMPTS;
}

export const onRequestPost = async ({ request, env }: FunctionContext): Promise<Response> => {
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
    return new Response('Admin auth is not configured on the server.', { status: 500 });
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (isRateLimited(ip)) {
    return new Response('Too many attempts — try again in a few minutes.', { status: 429 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid request body.', { status: 400 });
  }

  if (body.password !== env.ADMIN_PASSWORD) {
    failedAttemptsByIp.set(ip, [...(failedAttemptsByIp.get(ip) || []), Date.now()]);
    return new Response('Incorrect password.', { status: 401 });
  }

  failedAttemptsByIp.delete(ip);
  const value = await createSessionValue(env);
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': sessionSetCookieHeader(value, request),
    },
  });
};
