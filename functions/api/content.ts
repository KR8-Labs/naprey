// GET /api/content — proxies the live content.json from GitHub. Reading it
// isn't sensitive (it's the same data the public site already shows), so this
// endpoint needs no auth beyond Cloudflare Access already gating /admin/*.
import type { FunctionContext } from './_shared';
// Local-dev-only sample data — bundled at build time, only ever read when
// LOCAL_DEV_SAMPLE_CONTENT is set (see the Env interface in _shared.ts).
import sampleContent from '../../src/data/content.json';

const FILE_PATH = 'src/data/content.json';

export const onRequestGet = async ({ env }: FunctionContext): Promise<Response> => {
  if (env.LOCAL_DEV_SAMPLE_CONTENT === 'true') {
    return new Response(JSON.stringify(sampleContent), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  // Cache-bust — raw.githubusercontent.com fronts a CDN that can serve a
  // stale copy for a few minutes otherwise, which would show Naprey outdated
  // content right after a previous publish.
  const url = `https://raw.githubusercontent.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/main/${FILE_PATH}?t=${Date.now()}`;

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    return new Response('Failed to load content from GitHub.', { status: 502 });
  }

  const text = await res.text();
  return new Response(text, {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
