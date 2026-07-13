// POST /api/logout — clears the session cookie.
import { sessionClearCookieHeader, type FunctionContext } from './_shared';

export const onRequestPost = async ({ request }: FunctionContext): Promise<Response> => {
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': sessionClearCookieHeader(request),
    },
  });
};
