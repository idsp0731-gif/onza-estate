import crypto from 'node:crypto';

export async function uploadImage(buf, { publicId, folder }) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error('CLOUDINARY_* env not set');

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash('sha1')
    .update(paramsToSign + apiSecret)
    .digest('hex');

  const form = new FormData();
  form.append('file', new Blob([buf], { type: 'image/png' }), 'image.png');
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('signature', signature);
  form.append('folder', folder);
  form.append('public_id', publicId);

  const r = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  });
  if (!r.ok) throw new Error(`Cloudinary ${r.status}: ${await r.text()}`);
  return r.json();
}
