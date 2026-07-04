// Generate a thumbnail image from an article.json, verify with Claude (multimodal),
// upload to Cloudinary, and emit the secure URL.
//
// Usage:
//   node scripts/market-news/generate-thumbnail.mjs --article path/to/article.json
//
// Article shape: { title, slug, abstraction, themeKeywords[] }

import './lib/env.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { claude, jsonOf, textOf } from './lib/anthropic.mjs';
import { generateImage } from './lib/openai-image.mjs';
import { uploadImage } from './lib/cloudinary.mjs';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const articlePath = arg('--article');
if (!articlePath) {
  console.error('Usage: node scripts/market-news/generate-thumbnail.mjs --article path/to/article.json');
  process.exit(1);
}

const article = JSON.parse(await fs.readFile(articlePath, 'utf8'));
const outDir = arg('--out', path.join(path.dirname(articlePath), 'thumbnail'));
const folder = arg('--folder', 'onza-estate/market-news');
await fs.mkdir(outDir, { recursive: true });

// --- Load thumbnail history (last 5 entries) for variety enforcement ---
const HISTORY_FILE = path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '.thumbnail-history.json');
let history = [];
try {
  const raw = await fs.readFile(HISTORY_FILE, 'utf8');
  history = JSON.parse(raw);
} catch {}
const recentHistory = history.slice(-5);
const historyText = recentHistory.length
  ? recentHistory.map((h, i) => `  ${i + 1}. ${h.date || '?'} | concept="${h.concept_name}" | motif=${JSON.stringify(h.motif)} | palette=${JSON.stringify(h.color_palette)}`).join('\n')
  : '  (履歴なし — 最初のサムネ生成)';

// --- A. pick a concept (single, not 3-then-select; saves a round trip) ----
const conceptPrompt = `あなたはブログのトップ画像コンセプトを決めるディレクターです。
以下の市況ニュース記事のトップ画像を1案だけ決めてください。

【★飯田氏お気に入りサムネ3枚（毎回この方向で組み立てる）★】
Ref1（外国人投資家×日本株）：アニメ風／祇園の町並みに桜・提灯・遠景に東京タワー／中東・インド・欧米・日本人の多国籍キャラが「Stock」と書かれた本/冊子を手にして買う風景。明るく彩度高め、ピンク＋青＋和の色。多国籍キャラの顔OK。
Ref2（為替介入）：3DCG写真風／天秤の左に金色の$シンボル、右に¥シンボル、男性の手が指で¥側を押し下げて天秤を傾けている／背景に遊園地（ジェットコースター＋観覧車）をぼかして配置。温かい琥珀色・夕陽トーン。映画的ライティング。
Ref3（強気弱気／株調整）：絵本キャラクター風／左半分は明るい青空＋緑のチャート上昇＋金色の牛キャラ（強気）／右半分は焼け跡の赤茶＋赤い下降矢印＋クマキャラ（弱気）の二画面コントラスト。

【★お気に入りサムネに共通する飯田氏の好み★】
1. **メタファーで抽象テーマを具象化**：株価動向→牛/熊キャラ、外資流入→人々が本を買う風景、介入→天秤を指で押す、のように記事テーマを目に見える物体・シーンに置き換える
2. **物語性・場面設定がある**：単なるシンボル列挙ではなく、舞台（祇園の町並み、遊園地、コントラスト世界）を作る
3. **明るく彩度高め、温かみのある色調**
4. **記事タイトル文字は入れない**（"Stock"のような小物の英単語はOK、記事タイトル相当の文字はNG）
5. **横長 1.5:1〜1.6:1 のブログヘッダー比率**
6. **★顔キャラは必須ではない、内容次第で判断する★**（2026-05-27飯田氏指示）
   - 顔キャラを毎回入れる必要なし。記事内容を示唆できる時だけ採用、ない方が良さそうなら抽象オブジェクトのみでもOK
   - **顔を入れた方が良いケース**：実在キーパーソンが主役（トランプ/日銀総裁/CEO）／擬人化キャラで対立や物語性を示せる（牛熊・多国籍人物）／場面設定にキャラがいた方が記事内容を伝えやすい
   - **顔なしでも良いケース**：制度・規則・指標解説（抽象的なテーマ）／メタファーが物体・場面で完結する（チャート×天秤、データセンターの森など）／顔があるとむしろテーマがブレるケース
7. **★顔を入れるなら、記事の主役にいる実在の固有人物を似顔絵化する★**（2026-05-25飯田氏指示）
   - 元記事に登場するキーパーソン（トランプ大統領・日銀総裁・企業CEOなど）が主役なら、その人物の似顔絵カリカチュアで描く
   - 単なる「アラブ風男性」「ビジネスマン」のような匿名キャラではなく、実在人物を特定可能な形で
   - 似顔絵スタイル（caricature）：髪・髭・体型・服装の特徴的要素を強調
8. **★表情は記事のトーンに合わせる★**（2026-05-25飯田氏指示）
   - 友好的記事 → 笑顔・親しみ表情OK
   - 緊張・対立・行き詰まり記事 → 真剣・対峙・思案の表情、**笑顔はNG**
   - どんな記事でも一律笑顔だと記事内容と浮く
9. **スタイルは記事ごとに切り替える**：アニメ風（Ref1）、3DCG/写真風（Ref2）、絵本キャラ風（Ref3）、似顔絵カリカチュア。テーマに合わせて選ぶ

【★直近5本のサムネ履歴（必ず参考にして、色味とモチーフを明確に変える）★】
${historyText}

上記の直近サムネとは、色味（カラーパレット）または主役モチーフのどちらか（できれば両方）を明確に変えてください。
同系統の色（例：青系が続いている）や同ジャンルのモチーフ（例：船・植物・自然系が続いている）が連続しないようにしてください。

【条件】
- 記事内容を**メタファー＋物語性のあるシーン**で表現（Ref1〜3の方向）。抽象オブジェクトをポツンと置くだけの構図は避ける
- 文字・数字・ロゴ・透かしを一切含まない（小物の英単語程度はOK）
- 親しみやすい雰囲気
- **明るく前向きなイメージ**（色味は彩度高め・光量たっぷり／ただし地政学・孤独死など重い話題は夕景・夜景でトーンを落とすのも可）
- **顔・キャラクター・人物・動物**：必須ではない（記事内容を示唆できる時だけ採用、抽象オブジェクトのみでもOK）
- **★実在人物が記事主役なら似顔絵カリカチュアで描く**：トランプ大統領・日銀総裁・CEOなどキーパーソンが主役記事は、その人物の似顔絵を中心に置く（匿名「ビジネスマン」風はNG）
- 制度・規則・指標解説など抽象的なテーマで、メタファーが物体・場面で完結する場合は顔なしでもOK
- **AI生成感が出すぎない**こと（過度な対称、つるつるプラスチック感、絵文字ライクな単純化、ベタなテンプレ構図はNG）。スタイル自体はフォトリアル／3DCG／半リアル／アニメ／絵本キャラ風いずれもOK、ただしテンプレ既視感だけ避ける
- **記事ごとに色味とスタイルを前回と変える**：アニメ風→3DCG→絵本→水彩 などサイクルさせる。同系統の色・モチーフを連続させない
- 都市・金融モチーフ（都市スカイライン／コイン＋チャート／東京タワー／世界地図など）は頻度が高くなければOK、続けて2-3回使うと既視感が出るので間に別ジャンルを挟む

【記事タイトル】${article.title}
【記事の本質】${article.abstraction || ''}
【テーマキーワード】${(article.themeKeywords || []).join(' / ')}

【返却フォーマット（JSONのみ、コードフェンスや前置きなし）】
{
  "concept_name": "案の名前",
  "description": "画像内容の説明（150字程度）",
  "motif": ["主要モチーフ"],
  "color_palette": ["色1", "色2", "色3"],
  "mood": "雰囲気の形容",
  "image_prompt_en": "gpt-image-1に渡す英語プロンプト（文字を含めない・no text指示込み・横長blog header用）"
}`;

console.log('[A] Concept selection...');
const conceptRes = await claude([{ role: 'user', content: conceptPrompt }]);
const concept = jsonOf(conceptRes);
console.log(`  concept: ${concept.concept_name}`);
await fs.writeFile(path.join(outDir, 'concept.json'), JSON.stringify(concept, null, 2));

// --- B. generate + verify loop (max 3) ----
const STYLE_TAIL =
  ' Style: metaphor-driven storytelling scene (translate the abstract theme into a concrete scene with characters/objects/setting, NOT just floating abstract symbols). BRIGHT and cheerful with vibrant saturated colors and plenty of light (muted/dark only OK for heavy topics like geopolitical risk). Characters allowed — human faces, animal faces, anthropomorphic mascots (bulls, bears, cute creatures), multicultural people are all encouraged when they fit the theme. No headline text, no Japanese text, no large numbers, no logos, no watermark (small English label words on props like "Stock" are OK). Avoid the obvious AI-template look: no extreme symmetry, no glossy plastic surfaces, no emoji-like simplification, no overcrowded generic icons. Pick a specific style for this article from: anime/illustration (Ghibli/Pixar-ish), 3D-CG photo-realistic with cinematic lighting, painterly storybook with cute characters, half-realistic-half-anime, watercolor, etc. — vary the style between articles so consecutive thumbnails feel distinctly different. Format: blog header image, horizontal 1536x1024 composition, central focus.';

let basePrompt = concept.image_prompt_en + STYLE_TAIL;
let acceptedBuf = null;
let acceptedAttempt = 0;

for (let attempt = 1; attempt <= 3; attempt++) {
  console.log(`[B${attempt}] Generating image...`);
  const buf = await generateImage(basePrompt);
  await fs.writeFile(path.join(outDir, `image-attempt-${attempt}.png`), buf);

  console.log(`[B${attempt}] Verifying...`);
  const verifyPrompt = `この画像が、以下の市況ニュース記事のトップ画像として適切か判定してください。

【判定基準】
1. 記事タイトルや日本語の長文・大きな数字・ロゴが含まれていないか（含まれていたら即NG → regenerate。小物の英単語"Stock"程度はOK）
2. **AI生成感が出すぎていないか**（過度な対称・つるつるプラスチック感・絵文字ライクな単純化・ベタなテンプレ構図 → regenerate）
3. **メタファー＋物語性のあるシーンになっているか**：抽象オブジェクトを並べただけになっていないか／舞台設定・登場人物・小物が組み合わさってストーリーを感じるか
4. 記事の本質を象徴する具象シーンになっているか
5. 親しみやすいか
6. 断定的・押し付け的でないか
7. **明るく前向きなイメージか**（重い話題以外で暗い・くすんだ・モノトーン寄りなら regenerate、彩度高めで光量のある画作りを要求）
8. **顔・キャラクター・人物・動物はOK**（積極的に活用OK。Ref1〜3 のような擬人化キャラ・多国籍人物・牛/熊マスコットなどテーマに合えば歓迎）
9. **モチーフ・スタイルのバリエーション**：直近のサムネと色味・スタイル（アニメ／3DCG／絵本キャラ等）が連続していないか／同ジャンル（都市スカイライン／コイン＋チャート／世界地図など）が連続していないか

【記事タイトル】${article.title}
【記事の本質】${article.abstraction || ''}
【画像コンセプト】${concept.concept_name} / ${concept.description}

【返却フォーマット（JSONのみ・コードフェンスなし）】
{
  "verdict": "approve" | "regenerate",
  "checks": { "no_text": true, "not_ai_like": true, "suggestive": true, "on_topic": true, "pop_friendly": true, "not_assertive": true },
  "issues": [],
  "regeneration_hint": "再生成する場合のプロンプト調整指示（あれば）"
}`;

  const verifyRes = await claude([
    {
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: 'image/png', data: buf.toString('base64') } },
        { type: 'text', text: verifyPrompt },
      ],
    },
  ]);
  const verdict = jsonOf(verifyRes);
  await fs.writeFile(path.join(outDir, `verify-${attempt}.json`), JSON.stringify(verdict, null, 2));
  console.log(`  verdict: ${verdict.verdict}`);

  if (verdict.verdict === 'approve') {
    acceptedBuf = buf;
    acceptedAttempt = attempt;
    break;
  }
  if (attempt < 3 && verdict.regeneration_hint) {
    basePrompt = `${concept.image_prompt_en} ${verdict.regeneration_hint}${STYLE_TAIL}`;
  }
}

if (!acceptedBuf) {
  console.warn('[!] 3 attempts without approval; using attempt 3.');
  acceptedBuf = await fs.readFile(path.join(outDir, 'image-attempt-3.png'));
  acceptedAttempt = 3;
}
await fs.writeFile(path.join(outDir, 'final-image.png'), acceptedBuf);

// --- C. Cloudinary upload ----
console.log('[C] Uploading to Cloudinary...');
const ymd = new Date().toISOString().slice(0, 10).replaceAll('-', '');
const publicId = `${article.slug}-${ymd}`;
const cld = await uploadImage(acceptedBuf, { publicId, folder });
const result = {
  cloudinary_url: cld.secure_url,
  public_id: cld.public_id,
  attempts: acceptedAttempt,
  concept_name: concept.concept_name,
};
await fs.writeFile(path.join(outDir, 'thumbnail.json'), JSON.stringify(result, null, 2));
await fs.writeFile(path.join(outDir, 'cloudinary.json'), JSON.stringify(cld, null, 2));

// Also copy to Google Drive Desktop for easy access (飯田氏のローカル参照用)
const DESKTOP_DIR = 'G:\\マイドライブ\\Desktop';
try {
  await fs.access(DESKTOP_DIR);
  const desktopPath = path.join(DESKTOP_DIR, `${publicId}.png`);
  await fs.writeFile(desktopPath, acceptedBuf);
  console.log(`  → also saved: ${desktopPath}`);
} catch (e) {
  console.warn(`  [!] Desktop copy skipped: ${DESKTOP_DIR} not accessible (${e.code || e.message})`);
}

// Append to history for next runs (keep last 20 entries)
const todayJST = (() => {
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return now.toISOString().slice(0, 10);
})();
history.push({
  date: todayJST,
  slug: article.slug,
  concept_name: concept.concept_name,
  motif: concept.motif || [],
  color_palette: concept.color_palette || [],
  mood: concept.mood || '',
});
history = history.slice(-20);
await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));

console.log('\n===== THUMBNAIL DONE =====');
console.log(`concept       : ${concept.concept_name}`);
console.log(`accepted      : attempt ${acceptedAttempt}/3`);
console.log(`cloudinary url: ${cld.secure_url}`);
console.log(`output dir    : ${outDir}`);
console.log(`history entries: ${history.length} (saved to .thumbnail-history.json)`);
console.log(`THUMBNAIL_URL=${cld.secure_url}`); // easy to grep / capture
