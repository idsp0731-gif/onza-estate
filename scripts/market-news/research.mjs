// Step 0: Gemini Grounding research for market-news pipeline.
// Reads source article + optional research focus, returns verified-source factual data.
//
// Usage:
//   node scripts/market-news/research.mjs --source tmp/source-YYYY-MM-DD.txt --out tmp/research-YYYY-MM-DD.txt
//   node scripts/market-news/research.mjs --source SRC --focus "過去のトランプ発言と市場値動き" --out OUT
//
// Output:
//   {out}.txt   : Geminiの返答テキスト全文（記事ドラフト時に「VERIFIED固定データ」として参照）
//   {out}.json  : sources の URL リスト

import './lib/env.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { gemini } from './lib/gemini.mjs';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const sourcePath = arg('--source');
const outPath = arg('--out');
const focus = arg('--focus', '');

if (!sourcePath || !outPath) {
  console.error('Usage: node scripts/market-news/research.mjs --source SRC --out OUT [--focus "リサーチ観点"]');
  process.exit(1);
}

const source = await fs.readFile(sourcePath, 'utf8');

// 取得日（JST, YYYY-MM-DD）。各ファクトに付与する。
const retrievedDate = (() => {
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return now.toISOString().slice(0, 10);
})();

const prompt = `あなたは金融・経済リサーチアシスタントです。
下記の元記事を読み、記事の主題に関連する以下の事実情報を Google Search で確認しながらまとめてください。

【リサーチ観点】
${focus || `
- 元記事で言及されている人物・組織・指標の、本日（${retrievedDate}）時点で取得できる最新の客観事実
- 元記事の論点に関連する過去1〜3カ月の出来事と市場値動きの時系列
- 元記事で引用されている数値（株価・金利・為替・商品価格・各種指標）の、現時点で最新の水準と前後の動き
- 元記事の論点を裏付ける（または反証する）追加事実
`}

【返却ルール ★厳守★】
- **必ず Google Search Grounding で検索した結果のみ書く**（あなた自身の知識ではなく、最新の検索結果を優先）
- **★情報は必ず「最新」を取りに行く（${retrievedDate} 時点）★**：
  - 数値・相場・制度・ランキング等は、本日時点で取得できる**最も新しい値・状況**を探して書く。古い年度・古い月の値で済ませない。
  - 各ファクトに、その値が指す**基準日（\`as_of_date\`）**を付ける（例：「フラット35の金利」なら2026年6月、「GDP」なら2026Q1 など。retrieved_date＝検索した日とは別物）。
  - 今日時点で最新と確認できたものは \`is_latest: true\`、より新しい値が存在しそうだが取れなかった／古いデータしかない場合は \`is_latest: false\` とし、\`notes\` に「より新しい値が出ている可能性。要WebSearch再確認」と明記する。
  - 制度・税制・補助金・金利・統計は改定が多い。**「現在も有効か／最新の改定はいつか」**まで確認する。
- **主要ファクト1件ごとに、必ず「一次ソースのURL」と「取得日」を付ける**。
  - 一次ソース＝発信元そのもの（官公庁・中央銀行・取引所・企業IR・一次統計・元記事の発表主体の公式サイト等）。まとめ記事・個人ブログ・キュレーションは一次ソースではない。一次ソースが取れない場合は信頼度の高い報道機関を second-best とし、\`source_tier\` に "primary" / "secondary" / "low_trust" を明記する。
  - \`source_url\` は実在する具体的なURL（トップページではなく該当ページ）。URLが取れないファクトは \`source_url\` を "不明" とし、その旨を \`notes\` に書く（捏造禁止）。
  - \`retrieved_date\` は本日（${retrievedDate}）。
- 日付・人物名・数値はソース付きで明示。不明な情報は「不明」「情報なし」と明記し、捏造しない。
- **元記事が日経などの信頼できる一次報道なら、元記事内の数値・発言は再検証も最新性チェックも不要**。最新性を確認するのは**補強情報（元記事の外から足す外部事実）のみ**。

【返却フォーマット】
{
  "verified_facts": [
    {
      "category": "出来事 / 数値 / 人物発言 / 指標",
      "date": "YYYY-MM-DD or YYYY-MM or 期間",
      "as_of_date": "その値・事実が指す基準日（例：2026-06 / 2026Q1）",
      "is_latest": true,
      "fact": "事実の要約",
      "source_url": "一次ソースの具体URL（取れなければ '不明'）",
      "source_tier": "primary / secondary / low_trust",
      "retrieved_date": "${retrievedDate}"
    }
  ],
  "timeline": [
    {
      "date": "YYYY-MM-DD",
      "event": "出来事の要約",
      "market_impact": "関連する市場値動き（あれば）",
      "source_url": "一次ソースの具体URL（取れなければ '不明'）",
      "retrieved_date": "${retrievedDate}"
    }
  ],
  "notes": "リサーチ全体の注意点・矛盾点・要追加検証項目（URL未取得のファクト、is_latest:false の項目をここに列挙）"
}

【元記事】
${source}`;

console.log(`source: ${sourcePath} (${source.length} chars)`);
console.log(`focus : ${focus || '(自動)'}`);
console.log('Gemini Search Grounding starting...');

const r = await gemini(prompt, { search: true, maxOutputTokens: 16000 });
console.log(`model: ${r._modelUsed}`);
console.log(`sources: ${r.sources.length}`);

await fs.writeFile(outPath, r.text, 'utf8');
const sourcesPath = outPath.replace(/\.txt$/, '.sources.json');
await fs.writeFile(sourcesPath, JSON.stringify(r.sources, null, 2), 'utf8');

console.log('');
console.log('===== RESEARCH DONE =====');
console.log(`output  : ${outPath} (${r.text.length} chars)`);
console.log(`sources : ${sourcesPath} (${r.sources.length} URLs)`);
console.log('');
console.log('⚠️  Note: Gemini出力は「verified固定データ」として generate-article.mjs の --research で参照。');
console.log('   ただし Gemini も誤情報を返すことがあるので、Step 5 で WebSearch による2回目検証を必ず実施。');
