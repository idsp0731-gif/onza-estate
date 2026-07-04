// Notion投稿本文と article.json の本文を比較し、差分（化け・欠落）を検出する。
// Notion MCPは Node からは直接呼べないので、agentが notion-fetch で取得した
// テキストをファイルに保存し、それを --notion-text に渡す前提。
//
// Usage:
//   node scripts/market-news/diff-notion.mjs --article path/to/article.json --notion-text path/to/notion.txt
//
// 出力：
//   差分箇所と前後コンテキストを列挙。文字化け・欠落の検出に使う。

import fs from 'node:fs/promises';
import path from 'node:path';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const articlePath = arg('--article');
const notionTextPath = arg('--notion-text');

if (!articlePath || !notionTextPath) {
  console.error('Usage: node scripts/market-news/diff-notion.mjs --article path/to/article.json --notion-text path/to/notion.txt');
  process.exit(1);
}

const article = JSON.parse(await fs.readFile(articlePath, 'utf8'));
const notionRaw = await fs.readFile(notionTextPath, 'utf8');

// 正規化：比較しやすいよう改行・スペース・Notion側の自動文字置換を吸収
// （Notion は 〜(U+301C波ダッシュ) → ～(U+FF5E全角チルダ) など自動変換するため）
function normalize(s) {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/<br>/g, '\n')      // <br>タグを改行に揃える
    .replace(/[ \t]+/g, ' ')
    .replace(/\n+/g, '\n')
    // Notion の既知の自動正規化を逆方向に揃える（化け検出のシグナルではないため）
    .replace(/～/g, '〜')         // 全角チルダ → 波ダッシュ
    .replace(/−/g, '－')         // minus(U+2212) → 全角マイナス
    .trim();
}

const src = normalize(article.body || '');
const dst = normalize(notionRaw);

// シンプルな文字列差分：源側を行ごとに分割して Notion 側を検索
const srcLines = src.split('\n').filter(Boolean);
const findings = [];

for (const line of srcLines) {
  if (line.length < 10) continue; // 短すぎる行は誤検出が多いのでスキップ
  if (dst.includes(line)) continue;

  // 完全一致しない → 部分一致を探して差分を絞り込む
  const partial = findClosest(line, dst);
  findings.push({
    src_line: line,
    closest_in_notion: partial.text,
    similarity: partial.similarity,
    diff_chars: charDiff(line, partial.text),
  });
}

function findClosest(needle, haystack) {
  // 単純なスライディングウィンドウで最も類似する箇所を探す
  let best = { text: '', similarity: 0, start: -1 };
  const N = needle.length;
  for (let i = 0; i <= haystack.length - 5; i++) {
    const window = haystack.slice(i, i + N + 5);
    const sim = similarity(needle, window);
    if (sim > best.similarity) {
      best = { text: window, similarity: sim, start: i };
    }
  }
  return best;
}

function similarity(a, b) {
  // 文字ベース最長共通部分列の割合（簡易版）
  const minLen = Math.min(a.length, b.length);
  let match = 0;
  for (let i = 0; i < minLen; i++) {
    if (a[i] === b[i]) match++;
  }
  return match / Math.max(a.length, b.length);
}

function charDiff(a, b) {
  // 違いがある文字位置をマーク
  const diffs = [];
  const minLen = Math.min(a.length, b.length);
  let inDiff = false;
  let diffStart = -1;
  for (let i = 0; i < minLen; i++) {
    if (a[i] !== b[i]) {
      if (!inDiff) {
        diffStart = i;
        inDiff = true;
      }
    } else {
      if (inDiff) {
        diffs.push({
          pos: diffStart,
          source: a.slice(Math.max(0, diffStart - 5), diffStart + (i - diffStart) + 5),
          notion: b.slice(Math.max(0, diffStart - 5), diffStart + (i - diffStart) + 5),
        });
        inDiff = false;
      }
    }
  }
  if (inDiff) {
    diffs.push({
      pos: diffStart,
      source: a.slice(Math.max(0, diffStart - 5), Math.min(a.length, diffStart + 15)),
      notion: b.slice(Math.max(0, diffStart - 5), Math.min(b.length, diffStart + 15)),
    });
  }
  if (a.length !== b.length) {
    diffs.push({
      pos: minLen,
      source: a.slice(Math.max(0, minLen - 10), Math.min(a.length, minLen + 20)),
      notion: b.slice(Math.max(0, minLen - 10), Math.min(b.length, minLen + 20)),
      note: `length differs: source=${a.length} notion=${b.length}`,
    });
  }
  return diffs;
}

console.log(`\n===== NOTION vs ARTICLE DIFF =====`);
console.log(`article: ${articlePath} (${src.length} chars normalized)`);
console.log(`notion : ${notionTextPath} (${dst.length} chars normalized)`);
console.log(`差分検出: ${findings.length} 行`);
console.log('');

for (const f of findings) {
  console.log(`--- 差分 ---`);
  console.log(`source: ${f.src_line.slice(0, 100)}${f.src_line.length > 100 ? '…' : ''}`);
  console.log(`notion: ${f.closest_in_notion.slice(0, 100)}${f.closest_in_notion.length > 100 ? '…' : ''}`);
  console.log(`類似度: ${(f.similarity * 100).toFixed(1)}%`);
  for (const d of f.diff_chars.slice(0, 3)) {
    console.log(`  pos ${d.pos}: source="${d.source}" notion="${d.notion}"${d.note ? ' / ' + d.note : ''}`);
  }
  console.log('');
}

const reportPath = path.join(path.dirname(articlePath), 'diff-notion-report.json');
await fs.writeFile(reportPath, JSON.stringify({ article: articlePath, notion: notionTextPath, findings }, null, 2));

console.log(`report: ${reportPath}`);

if (findings.length === 0) {
  console.log('\n✅ 差分なし。投稿時の文字化け・欠落は検出されませんでした');
} else {
  console.log(`\n⚠️  ${findings.length}件の差分あり。投稿時に化け・欠落が発生している可能性。Notionを確認・修正してください`);
  process.exit(2);
}
