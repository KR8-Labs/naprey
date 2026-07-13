// POST /api/save-content — the only place GITHUB_PAT is ever used. Reads the
// current file's sha, then commits the edited JSON straight to `main`, which
// the existing GitHub Actions workflow picks up and deploys.
import { verifySession, utf8ToBase64, type FunctionContext } from './_shared';

const FILE_PATH = 'src/data/content.json';

export const onRequestPost = async ({ request, env }: FunctionContext): Promise<Response> => {
  const authError = await verifySession(request, env);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON body.', { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return new Response('Content must be a JSON object.', { status: 400 });
  }

  if (env.LOCAL_DEV_SAMPLE_CONTENT === 'true') {
    console.log('[local dev] Publish received (not committed to GitHub):', JSON.stringify(body).slice(0, 300));
    return new Response(JSON.stringify({ ok: true, local: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!env.GITHUB_PAT) {
    return new Response('GitHub token is not configured on the server.', { status: 500 });
  }

  const ghHeaders = {
    Authorization: `Bearer ${env.GITHUB_PAT}`,
    'User-Agent': 'naprey-admin',
    Accept: 'application/vnd.github+json',
  };
  const apiUrl = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${FILE_PATH}`;

  const currentRes = await fetch(`${apiUrl}?ref=main`, { headers: ghHeaders });
  if (!currentRes.ok) {
    return new Response('Could not read the current content file from GitHub.', { status: 502 });
  }
  const current = (await currentRes.json()) as { sha: string };

  const newContent = JSON.stringify(body, null, 2) + '\n';

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: { ...ghHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Update site content via admin',
      content: utf8ToBase64(newContent),
      sha: current.sha,
      branch: 'main',
    }),
  });

  if (putRes.status === 409) {
    return new Response('Content changed since it was loaded — please reload and try again.', { status: 409 });
  }
  if (!putRes.ok) {
    const errText = await putRes.text().catch(() => '');
    return new Response(`GitHub commit failed: ${errText}`, { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
