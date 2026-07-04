// ⚠️ DEPRECATED（2026-05-31 飯田氏指示）：ChatGPTの自動ファクトチェックはパイプラインから廃止。
//    ファクトチェックは「セッション内の WebSearch のみ」で実施する（run.mjs からは呼ばれない）。
//    このファイルは参照用に残置。新規パイプラインでは使わないこと。
//    理由：ChatGPTは学習カットオフで新しい制度・数値を誤判定する／二重FCは不要との判断。
//
// （旧）Step 4: Automated fact-check on the finalized article via ChatGPT gpt-5.5.
// Runs after generate-article.mjs, before publishing to Notion.
//
// Usage:
//   node scripts/market-news/fact-check.mjs --article path/to/article.json [--source SRC] [--research RES]
//
// Output:
//   {articleDir}/fact-check-report.json
//   Exit code 2 if hard fails found.

import './lib/env.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chatgpt, chatgptJson } from './lib/openai-chat.mjs';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const articlePath = arg('--article');
const sourcePath = arg('--source');
const researchPath = arg('--research');

if (!articlePath) {
  console.error('Usage: node scripts/market-news/fact-check.mjs --article path/to/article.json [--source SRC] [--research RES]');
  process.exit(1);
}

const article = JSON.parse(await fs.readFile(articlePath, 'utf8'));
const source = sourcePath ? await fs.readFile(sourcePath, 'utf8') : '';
const research = researchPath ? await fs.readFile(researchPath, 'utf8') : '';

const prompt = `あなたは金融記事の校閲担当です。下記の記事を、提示された元記事およびリサーチ情報と照合し、事実関係の誤りを検出してください。

【★最重要：チェック対象範囲★】
元記事は日経新聞で、**一次情報として信用できる**ため：
- ✅ チェック対象：補強情報（リサーチ結果や AI 知識由来）、論理整合性、指標粒度、誤分類、因果方向、解釈ラベル、strawman構文
- ❌ チェック対象外：**元記事PDFに書いてある数字・引用・発言・固有名詞・日付は再検証不要**（日経が信用できる一次ソースなので）

【観点】
1. **指標の粒度**：「長期金利」「10年物」「40年物」など年限が正しいか、混同していないか
2. **業種カテゴリの誤分類**：企業名と業種（SaaS/AI/半導体/銀行等）の対応が正しいか
3. **因果関係**：「○○が△△を左右する」のような因果方向が元記事と一致するか
4. **誤った関連付け**：実際には無関係な事柄を「同時に」「重なって」などで関連付けていないか
5. **元記事にないラベル/概念**：「節目水準」「分水嶺」「転換点」「構造変化」「重なる週」など、元記事に存在しない解釈ラベルを勝手に付けていないか
6. **strawman構文**：「○○ではなく××」「○○というよりも××」「○○より××が大切」など、元記事にない仮想敵を立てていないか
7. **補強情報の正確性**：リサーチ結果や AI 知識から補った情報（元記事に書かれていない過去発言・追加データ）が事実か
8. **専門用語の解説有無**：初出の専門用語（クオンツファンド、モメンタム、高ベータ、ハイボラ、フェドウオッチ等）に括弧解説があるか

【判定ルール】
- 確信度の高いものだけ指摘（不確実な指摘は混ぜない）
- 元記事PDFに書いてある内容との一致確認は不要（一次ソース信頼）
- リサーチ/AI知識由来の情報で明確に怪しいものを high
- 論理整合性・カテゴリ誤分類・因果逆転は high
- ニュアンス・表現の差は low（または無視）

【返却フォーマット（JSONのみ、コードフェンスなし）】
{
  "findings": [
    {
      "claim": "記事中の該当箇所（30字以内）",
      "issue": "問題点（事実誤認・日付ズレ・指標混同など）",
      "evidence": "元記事 or リサーチでの実際の事実",
      "suggestion": "書き換え案",
      "severity": "high | medium | low"
    }
  ],
  "summary": "全体所感（誤りの傾向）"
}
findingsが空なら {"findings": [], "summary": "問題なし"} を返してください。

【記事タイトル】
${article.title}

【記事本文】
${article.body}

${source ? `【元記事】\n${source}\n` : ''}
${research ? `【Step 0 リサーチ結果（verified固定データ）】\n${research}\n` : ''}`;

console.log(`article  : ${articlePath}`);
console.log(`source   : ${sourcePath || '(未指定)'}`);
console.log(`research : ${researchPath || '(未指定)'}`);
console.log('');
console.log('[Step 4] ChatGPT gpt-5.5 ファクトチェック実行中...');

const r = await chatgpt([{ role: 'user', content: prompt }], { max_tokens: 8000 });
console.log(`model: ${r._modelUsed}`);

let result;
try {
  result = chatgptJson(r);
} catch (e) {
  console.error('[!] JSON parse failed:', e.message);
  console.error('Raw response (first 500 chars):', (r.content || r.text || '').slice(0, 500));
  process.exit(1);
}

const outDir = path.dirname(articlePath);
const reportPath = path.join(outDir, 'fact-check-report.json');
await fs.writeFile(reportPath, JSON.stringify(result, null, 2), 'utf8');

const high = (result.findings || []).filter((f) => f.severity === 'high');
const medium = (result.findings || []).filter((f) => f.severity === 'medium');
const low = (result.findings || []).filter((f) => f.severity === 'low');

console.log('');
console.log('===== FACT CHECK DONE =====');
console.log(`findings : ${(result.findings || []).length} (high: ${high.length}, medium: ${medium.length}, low: ${low.length})`);
console.log(`report   : ${reportPath}`);

if (high.length) {
  console.log('');
  console.log('⚠️  HIGH severity findings:');
  for (const f of high) {
    console.log(`  - claim: ${f.claim}`);
    console.log(`    issue: ${f.issue}`);
    console.log(`    evidence: ${f.evidence}`);
    console.log(`    suggestion: ${f.suggestion}`);
    console.log('');
  }
}
if (medium.length) {
  console.log('');
  console.log('⚠️  MEDIUM severity findings:');
  for (const f of medium) {
    console.log(`  - claim: ${f.claim} / issue: ${f.issue}`);
  }
}

console.log('');
console.log(`summary: ${result.summary || '(なし)'}`);
console.log('');
console.log('⚠️  Step 5: このセッションのClaude+WebSearchで2回目検証を必ず実施してください。');
console.log('   Step 4の自動検出は補助。最終判断はStep 5のWebSearch結果。');

if (high.length > 0) process.exit(2);
