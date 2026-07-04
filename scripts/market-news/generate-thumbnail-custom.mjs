// One-off: generate a specific thumbnail with a custom prompt and upload.
// Usage:
//   node scripts/market-news/generate-thumbnail-custom.mjs --article path/to/article.json --prompt-file path/to/prompt.txt

import './lib/env.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { generateImage } from './lib/openai-image.mjs';
import { uploadImage } from './lib/cloudinary.mjs';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const articlePath = arg('--article');
const promptFilePath = arg('--prompt-file');
const folder = arg('--folder', 'onza-estate/market-news');

if (!articlePath || !promptFilePath) {
  console.error('Usage: node scripts/market-news/generate-thumbnail-custom.mjs --article ART --prompt-file PROMPT');
  process.exit(1);
}

const article = JSON.parse(await fs.readFile(articlePath, 'utf8'));

// ★飯田氏の恒久スタイル（毎回適用・手書きプロンプトに自動付加）★
// 2026-05-17「記事内容に示唆的」/ 2026-07-01「真ん中に物があるだけはNG・場面に」/
// 2026-07-03「建物があるだけでワンパターン化・示唆的な画像を求めてたはず」
const STYLE_GUARD = `

MANDATORY STYLE (always applies, overrides conflicting wording above):
- SUGGESTIVE METAPHOR FIRST: the image must be a visual metaphor that hints at the article's key insight — NOT a literal depiction of the article's subject (e.g. do not just draw buildings for a real-estate story unless they are background/supporting).
- A SCENE, not a lone centered object: real depth with foreground + midground + background, stage, props and light. People are optional, not required.
- BRIGHT and inviting: high overall brightness, rich but tasteful saturation. No dark, moody or night-dominant images (exception: genuinely heavy topics).
- Vary from recent thumbnails in motif, light/time-of-day, touch and palette. Financial motifs (coins, charts, skylines) are allowed occasionally — just never as a repeated pattern or icon jumble.
- STRICT: no readable text, no numbers, no logos, no watermark. No cut-off hands/limbs. No human figures inside containers. Avoid AI-template looks (extreme symmetry, plastic 3D sheen, emoji-like simplification).
- Format: horizontal blog header, 1536x1024.`;

const prompt = (await fs.readFile(promptFilePath, 'utf8')).trim() + STYLE_GUARD;
const outDir = path.join(path.dirname(articlePath), 'thumbnail');
await fs.mkdir(outDir, { recursive: true });

console.log(`article: ${articlePath}`);
console.log(`prompt : ${promptFilePath} (${prompt.length} chars)`);
console.log('Generating image...');
const buf = await generateImage(prompt);
await fs.writeFile(path.join(outDir, 'image-custom.png'), buf);
await fs.writeFile(path.join(outDir, 'final-image.png'), buf);
console.log('Image saved.');

console.log('Uploading to Cloudinary...');
const ymd = new Date().toISOString().slice(0, 10).replaceAll('-', '');
const publicId = `${article.slug}-${ymd}`;
const cld = await uploadImage(buf, { publicId, folder });
console.log(`URL: ${cld.secure_url}`);
await fs.writeFile(path.join(outDir, 'thumbnail.json'), JSON.stringify({ cloudinary_url: cld.secure_url, public_id: cld.public_id, prompt }, null, 2));

const DESKTOP_DIR = 'G:\\マイドライブ\\Desktop';
try {
  await fs.access(DESKTOP_DIR);
  const desktopPath = path.join(DESKTOP_DIR, `${publicId}.png`);
  await fs.writeFile(desktopPath, buf);
  console.log(`Also saved: ${desktopPath}`);
} catch (e) {
  console.warn(`Desktop save skipped: ${e.code || e.message}`);
}

console.log('\n===== DONE =====');
console.log(`Cloudinary URL: ${cld.secure_url}`);
