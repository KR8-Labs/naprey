// POST /api/upload-image — receives a (client-resized) image file and writes
// it straight to the R2 bucket via its binding. No signing step needed here,
// unlike a third-party signed-upload flow — the binding itself is the trust
// boundary, and it's only reachable by a verified Access request.
import { verifyAccessJwt, type FunctionContext } from './_shared';

const MAX_BYTES = 8 * 1024 * 1024; // 8MB — generous given the client resizes before upload

function extensionFor(mimeType: string): string {
  if (mimeType === 'image/webp') return 'webp';
  if (mimeType === 'image/png') return 'png';
  return 'jpg';
}

export const onRequestPost = async ({ request, env }: FunctionContext): Promise<Response> => {
  const accessError = await verifyAccessJwt(request, env);
  if (accessError) return accessError;

  if (!env.IMAGES_BUCKET || !env.R2_PUBLIC_BASE_URL) {
    return new Response('Image storage is not configured on the server.', { status: 500 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) {
    return new Response('No file uploaded.', { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return new Response('Only image uploads are allowed.', { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return new Response('Image is too large (max 8MB).', { status: 400 });
  }

  const key = `naprey-site/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extensionFor(file.type)}`;

  await env.IMAGES_BUCKET.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  const url = `${env.R2_PUBLIC_BASE_URL.replace(/\/+$/, '')}/${key}`;
  return new Response(JSON.stringify({ url }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
