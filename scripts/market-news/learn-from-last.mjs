// Step -1: 前回記事の手直し（飯田氏編集）を学習ポイントとして抽出する。
//
// 前提：前回記事の Notion 最新版を手動で fetch して以下に保存しておく
//   tmp/{prev-slug}-{date}/notion-final.txt
//
// 使い方：
//   node scripts/market-news/learn-from-last.mjs --article tmp/{prev-slug}-{date}/article.json --notion-text tmp/{prev-slug}-{date}/notion-final.txt --out tmp/learnings-{today-date}.txt
//
// 出力：
//   {out}.txt   : 学習ポイントのまとめ（次のfeedback.txtに組み込む）
//
// 仕組み：
//   1. article.json と Notion本文を diff
//   2. 既知の化け修正パターンを除外（兆→兴、膨→膞、撤廃→撕廢など）
//   3. 残りの差分（飯田氏の編集改善）を ChatGPT で分類・学習ポイント化

import './lib/env.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chatgpt, chatgptJson } from './lib/openai-chat.mjs';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const articlePath = arg('--article');
const notionTextPath = arg('--notion-text');
const outPath = arg('--out');

if (!articlePath || !notionTextPath || !outPath) {
  console.error('Usage: node scripts/market-news/learn-from-last.mjs --article ART --notion-text NOTION --out OUT');
  console.error('');
  console.error('前提：前回記事のNotion最新版を手動でfetchしてnotion-final.txtに保存しておく');
  console.error('  例：mcp__notion-fetch で前回記事を取得 → tmp/{prev-slug}/notion-final.txt');
  process.exit(1);
}

const article = JSON.parse(await fs.readFile(articlePath, 'utf8'));
const notionRaw = await fs.readFile(notionTextPath, 'utf8');

// 正規化
function normalize(s) {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/<br>/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n+/g, '\n')
    .replace(/～/g, '〜')
    .replace(/−/g, '－')
    .trim();
}

// 既知の化け修正パターン（学習対象から除外）
const KNOWN_MOJIBAKE_FIXES = [
  // 既存のpatterns（5/24以降観測したもの）
  /[兴卻撕廢膞臆貲剣獣摑剔]/, // 化けに使われる文字
  /र/, // Devanagari ra (30の代替化け)
  /¸/, // cedilla (86直前)
  /㊕|㌆|㎚/, // 丸囲み記号系の化け
];

function isLikelyMojibakeFix(srcLine, dstLine) {
  // src or dst に化け文字が含まれる場合は化け修正と判定
  for (const pat of KNOWN_MOJIBAKE_FIXES) {
    if (pat.test(srcLine) || pat.test(dstLine)) return true;
  }
  return false;
}

const src = normalize(article.body || '');
const dst = normalize(notionRaw);

const srcLines = src.split('\n').filter(Boolean);
const editFindings = [];

for (const line of srcLines) {
  if (line.length < 10) continue;
  if (dst.includes(line)) continue;

  // 類似行を探す
  const partial = findClosest(line, dst);
  if (partial.similarity < 0.3) continue; // 全く違うものはスキップ（章再構成など）

  // 化け修正なら除外
  if (isLikelyMojibakeFix(line, partial.text)) continue;

  editFindings.push({
    before: line,
    after: partial.text,
    similarity: partial.similarity,
  });
}

function findClosest(needle, haystack) {
  let best = { text: '', similarity: 0 };
  const N = needle.length;
  for (let i = 0; i <= haystack.length - 5; i++) {
    const window = haystack.slice(i, i + N + 5);
    const sim = similarity(needle, window);
    if (sim > best.similarity) {
      best = { text: window, similarity: sim };
    }
  }
  return best;
}

function similarity(a, b) {
  const minLen = Math.min(a.length, b.length);
  let match = 0;
  for (let i = 0; i < minLen; i++) {
    if (a[i] === b[i]) match++;
  }
  return match / Math.max(a.length, b.length);
}

console.log(`article : ${articlePath} (${src.length} chars normalized)`);
console.log(`notion  : ${notionTextPath} (${dst.length} chars normalized)`);
console.log(`編集差分（化け除外後）: ${editFindings.length}件`);

if (editFindings.length === 0) {
  console.log('\n✅ 飯田氏の手直しは検出されませんでした（または全て化け修正）。');
  await fs.writeFile(outPath, '前回記事の飯田氏手直しは検出されませんでした（または全て化け修正）。', 'utf8');
  process.exit(0);
}

console.log('\n[ChatGPT] 学習ポイント抽出中...');

const prompt = `あなたは編集者の手直しから学習ポイントを抽出するアシスタントです。
下記は、前回記事の Notion 投稿後に編集者（飯田氏）が手動で書き直した差分です。
これらの編集パターンを分析し、次回記事で気をつけるべき「学習ポイント」を抽出してください。

【前回記事のタイトル】
${article.title}

【飯田氏の手直し差分（before → after）】
${editFindings.map((f, i) => `[${i + 1}] before: ${f.before}\n    after : ${f.after}`).join('\n\n')}

【分析観点】
- 表現スタイルの変更（口調・接続詞・語彙）
- 構造的な変更（章の追加・削除・要素移動）
- 内容の調整（強調・トーン・バランス）
- 既知のルール（strawman/節目水準/同時並行/RC区分連呼/今週付与/対比6:4 など）に該当するか
- 既知ルールに該当しないなら、新しい学習ポイントとして抽出

【返却フォーマット（JSONのみ・コードフェンスなし）】
{
  "learnings": [
    {
      "pattern": "学習ポイント（次回からこう書く）",
      "example_before": "実際の手直し前",
      "example_after": "実際の手直し後",
      "category": "表現/構造/内容/トーン/既知ルールの強化"
    }
  ],
  "summary": "全体所感（このシリーズで気をつけるべき傾向）"
}

learnings が空なら {"learnings": [], "summary": "..."} を返してください。`;

const r = await chatgpt([{ role: 'user', content: prompt }], { max_tokens: 4000 });
console.log(`model: ${r._modelUsed}`);

let result;
try {
  result = chatgptJson(r);
} catch (e) {
  console.error('[!] JSON parse failed:', e.message);
  await fs.writeFile(outPath, `[抽出失敗] ${e.message}\n\n生差分:\n${JSON.stringify(editFindings, null, 2)}`, 'utf8');
  process.exit(1);
}

// 学習ポイントをマークダウン形式で出力
let md = `# 前回記事の手直し学習ポイント\n\n`;
md += `**前回記事**: ${article.title}\n\n`;
md += `**全体所感**: ${result.summary || '(なし)'}\n\n`;
md += `## 学習ポイント（次回記事生成時に守る）\n\n`;
for (const l of result.learnings || []) {
  md += `### ${l.category}: ${l.pattern}\n`;
  md += `- Before: ${l.example_before}\n`;
  md += `- After : ${l.example_after}\n\n`;
}

await fs.writeFile(outPath, md, 'utf8');

console.log(`\n===== LEARNING DONE =====`);
console.log(`learnings : ${(result.learnings || []).length}件`);
console.log(`output    : ${outPath}`);
console.log('');
console.log('次のfeedback.txt の冒頭に組み込んでください。');
