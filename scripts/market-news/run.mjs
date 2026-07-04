// One-shot orchestrator (pipeline v2.1: WebSearchのみ／GPT自動ファクトチェック廃止).
// Usage:
//   node scripts/market-news/run.mjs --source path/to/source.txt                 # Step 1-3 のみ（research無し）
//   node scripts/market-news/run.mjs --source SRC --feedback FB                   # 編集ブリーフ付き
//   node scripts/market-news/run.mjs --source SRC --research                      # ★Step 0 のみ実行して停止（ソース確認ゲート）
//   node scripts/market-news/run.mjs --source SRC --research-file tmp/research-X.txt   # 確認後に Step 1-3
//   node scripts/market-news/run.mjs --source SRC --no-thumbnail --no-sns
//
// パイプライン v2.2（rule_market_news_pipeline_websearch_only.md 参照）：
//   Step 0: Gemini Grounding リサーチ（opt-in。主要ファクトに一次ソースURL+取得日を必ず付与）
//     └─ ★Step 0 直後ゲート：このセッションでClaudeが「背骨の内容に新しく信頼できる一次ソースが付いているか」を確認 → Step 1 へ
//   Step 1: ★たたき＝このセッション（Claude Code）が直接執筆 → draft.json を --draft で渡す★（Claude API不使用。飯田氏指示2026-06-01）
//   Step 2-3: generate-article.mjs が [3/4]ChatGPTレビュー → [4/4]Claude仕上げ を実行（確認済み research も渡す）
//   ファクトチェック: ★セッション内の WebSearch のみ★（ChatGPT/Geminiの自動ファクトチェックは廃止）

import './lib/env.mjs';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}
function flag(name) {
  return process.argv.includes(name);
}

const sourcePath = arg('--source');
const feedbackPath = arg('--feedback');
const researchFocus = arg('--research-focus', '');
const researchFile = arg('--research-file'); // ゲート確認済みの背骨データ
const draftFile = arg('--draft'); // ★Step1（たたき）をこのセッションで生成した場合に渡す
if (!sourcePath) {
  console.error('Usage: node scripts/market-news/run.mjs --source SRC [--feedback FB] [--draft DRAFT.json] [--research | --research-file FILE] [--research-focus "観点"] [--no-thumbnail] [--no-sns]');
  process.exit(1);
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', shell: true });
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

// --- Step 0（opt-in）: Gemini Grounding research → 直後にソース確認ゲートで停止 ---
if (flag('--research')) {
  console.log('===== Step 0: Gemini Grounding リサーチ（主要ファクトに一次ソースURL+取得日付き）=====');
  const dateStr = new Date().toISOString().slice(0, 10);
  const researchPath = `tmp/research-${dateStr}.txt`;
  const args = ['scripts/market-news/research.mjs', '--source', sourcePath, '--out', researchPath];
  if (researchFocus) args.push('--focus', researchFocus);
  await run('node', args);

  console.log('\n===== Step 0 DONE — ★ソース確認ゲート（このセッションでClaudeが実施）★ =====');
  console.log(`research : ${researchPath}`);
  console.log(`sources  : ${researchPath.replace(/\.txt$/, '.sources.json')}`);
  console.log('');
  console.log('NEXT（Step 1 へ進む前に必ず）:');
  console.log('  1. 背骨ファクト（記事の主張を支える主要事実）に、新しく信頼できる一次ソースが付いているか確認');
  console.log('     - source_tier=primary か（官公庁/中央銀行/取引所/企業IR/一次統計など発信元そのものか）');
  console.log('     - source_url が実在し、トップページでなく該当ページか／retrieved_date が本日か');
  console.log('  2. URL不明・low_trust・怪しいファクトは WebSearch で一次確認し、research ファイルを手修正');
  console.log('  3. 背骨にソースが揃ったら Step 1-3 を実行：');
  console.log(`     node scripts/market-news/run.mjs --source ${sourcePath}${feedbackPath ? ` --feedback ${feedbackPath}` : ''} --research-file ${researchPath}`);
  process.exit(0);
}

// --- Step 1-3: article ---
// Step 1（たたき）はこのセッション（Claude Code）が執筆 → --draft で渡す（飯田氏指示2026-06-01）。
//   --draft あり：generate-article は [3/4]ChatGPTレビュー＋[4/4]Claude仕上げのみ実行。
//   --draft なし：従来どおり [1/4]要約＋[2/4]下書きの Claude API も実行（フォールバック）。
if (draftFile) {
  console.log('\n===== Step 1: たたき = セッション生成 draft.json を使用 → Step 2-3（ChatGPTレビュー→Claude仕上げ） =====');
} else {
  console.log('\n===== Step 1-3: article（--draft 未指定＝たたきもClaude APIで生成。推奨はセッションたたき→--draft） =====');
}
const articleArgs = ['scripts/market-news/generate-article.mjs', '--source', sourcePath];
if (feedbackPath) articleArgs.push('--brief', feedbackPath);
if (researchFile) articleArgs.push('--research', researchFile);
if (draftFile) articleArgs.push('--draft', draftFile);
await run('node', articleArgs);

// Find newest tmp dir
const tmpDirs = (await fs.readdir('tmp', { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => path.join('tmp', d.name));
const stats = await Promise.all(tmpDirs.map(async (d) => ({ d, s: await fs.stat(d) })));
stats.sort((a, b) => b.s.mtimeMs - a.s.mtimeMs);
const latestDir = stats[0].d;
const articlePath = path.join(latestDir, 'article.json');
console.log(`\nlatest output dir: ${latestDir}`);

// --- ファクトチェック: ★ChatGPT/Geminiの自動FCは廃止。セッション内の WebSearch のみ★ ---

// --- Optional: thumbnail + SNS ---
if (!flag('--no-thumbnail')) {
  console.log('\n===== Thumbnail =====');
  await run('node', ['scripts/market-news/generate-thumbnail.mjs', '--article', articlePath]);
}
if (!flag('--no-sns')) {
  console.log('\n===== SNS =====');
  await run('node', ['scripts/market-news/generate-sns.mjs', '--article', articlePath]);
}

const article = JSON.parse(await fs.readFile(articlePath, 'utf8'));
const cloudinaryUrlPath = path.join(latestDir, 'thumbnail', 'cloudinary-url.txt');
let cloudinaryUrl = '';
try {
  cloudinaryUrl = (await fs.readFile(cloudinaryUrlPath, 'utf8')).trim();
} catch {}

console.log('\n===== READY FOR NOTION + ファクトチェック（WebSearch） =====');
console.log(`title         : ${article.title}`);
console.log(`slug          : ${article.slug}`);
console.log(`date          : ${article.date}`);
console.log(`metadesc(${article.metadescription.length}字): ${article.metadescription}`);
console.log(`thumbnail     : ${cloudinaryUrl || '(not generated)'}`);
console.log(`output dir    : ${latestDir}`);
console.log(`research      : ${researchFile || '(なし)'}`);
console.log('');
console.log('NEXT STEPS:');
console.log('  - ★ファクトチェック：このセッションのClaude+WebSearchのみで実施★（GPT自動FCは廃止）');
console.log('    元記事内の数値・引用は再検証不要（日経＝一次情報）。補強情報・固有名詞・制度・粒度・因果のみ一次確認');
console.log('  - 修正後: Notion投稿 → check-typos + diff-notion');
console.log(`  - 「${path.basename(latestDir)} を Notion に投稿して」と Claude に指示`);
