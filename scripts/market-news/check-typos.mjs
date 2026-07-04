// CMS文字化け・誤字チェッカー
// Usage:
//   node scripts/market-news/check-typos.mjs --article path/to/article.json [--skip-gemini]
//   node scripts/market-news/check-typos.mjs --text-file path/to/text.txt [--skip-gemini]
//   node scripts/market-news/check-typos.mjs --text "本文文字列" [--skip-gemini]
//
// 投稿前後の二重チェック推奨：
//   1) 投稿前: --article で article.json を生成段階でスキャン
//   2) 投稿後: notion-fetch でCMS本文を取得 → ファイル保存 → --text-file でスキャン
//      （Notion MCP投稿時のUnicode escape事故を検出するため）
//
// 2段階チェック：
//   [A] 機械パターン検出（既知の文字化け・AI誤字パターン・稀少Unicode検出）
//   [B] Gemini文脈チェック（同音異義語・文脈依存の誤字を二重実行で確定）

import './lib/env.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { gemini, jsonOfGemini } from './lib/gemini.mjs';

// =========================================================
// [A] 機械パターン検出
// =========================================================

// 観測済みの文字化けパターン（feedback_avoid_typos.md より + 追加）
const KNOWN_TYPO_PATTERNS = [
  { wrong: '踯', right: '躯', context: '構造躯体（くたい）', regex: /踯/g },
  { wrong: '瑤', right: '瑕', context: '瑕疵（かし）・住宅瑕疵担保責任保険', regex: /瑤/g },
  { wrong: '隅', right: '隣', context: '隣接する（「隅接」「隅り合う」は誤）', regex: /隅(?:接|り合)/g },
  { wrong: '隠', right: '隣', context: '隣接する（「隠接」は誤）', regex: /隠接/g },
  { wrong: 'あれゃ', right: 'あれば', context: '「であれば」のひらがな崩れ', regex: /あれゃ/g },
  { wrong: '銃', right: '銀', context: '銀行・銀座など金融文脈での誤変換', regex: /銃(?:行|座|融|貨)/g },
  // 簡体字 → 日本漢字
  { wrong: '应', right: '応', context: '簡体字混入', regex: /应/g },
  { wrong: '经', right: '経', context: '簡体字混入', regex: /经/g },
  { wrong: '济', right: '済', context: '簡体字混入', regex: /济/g },
  { wrong: '产', right: '産', context: '簡体字混入', regex: /产/g },
  { wrong: '场', right: '場', context: '簡体字混入', regex: /场/g },
  { wrong: '现', right: '現', context: '簡体字混入', regex: /现/g },
  { wrong: '实', right: '実', context: '簡体字混入', regex: /实/g },
  { wrong: '资', right: '資', context: '簡体字混入', regex: /资/g },
  { wrong: '产业', right: '産業', context: '簡体字混入', regex: /产业/g },
  { wrong: '业', right: '業', context: '簡体字混入', regex: /业/g },
  { wrong: '银', right: '銀', context: '簡体字混入', regex: /银/g },
  { wrong: '银行', right: '銀行', context: '簡体字混入', regex: /银行/g },
  { wrong: '价', right: '価', context: '簡体字混入', regex: /价/g },
  { wrong: '议', right: '議', context: '簡体字混入', regex: /议/g },
  { wrong: '议会', right: '議会', context: '簡体字混入', regex: /议会/g },
  { wrong: '观', right: '観', context: '簡体字混入', regex: /观/g },
  { wrong: '观察', right: '観察', context: '簡体字混入', regex: /观察/g },
  // 不動産文脈で頻出する誤変換
  { wrong: '陪審', right: '配信', context: '誤変換チェック', regex: /陪審/g },
  // 旧字・異体字の混入（CMSで表示崩れになりやすい）
  { wrong: '德', right: '徳', context: '旧字混入', regex: /德/g },
  { wrong: '渕', right: '淵', context: '異体字混入', regex: /渕/g },
];

// 文字化け候補：UTF-8 → Shift-JIS or CP932 変換失敗による mojibake 文字群
// + Notion MCP投稿時のUnicode escape事故で観測された稀少文字
const MOJIBAKE_RANGES = [
  // 日本語記事に出てこない文字スクリプト（混入は化けの強い証拠）
  { name: 'ハングル', regex: /[가-힯]/g },
  { name: 'デヴァナガリ（ヒンディー語系）', regex: /[ऀ-ॿ]/g }, // 観測例：30→र(U+0930)
  { name: 'タイ文字', regex: /[ก-๛]/g },
  { name: 'アラビア文字', regex: /[؀-ۿ]/g },
  { name: 'キリル文字', regex: /[Ѐ-ӿ]/g },
  // 記号化け（よくある「縺」「繧」「繝」「闍」「螟」など）
  { name: 'UTF-8→SJIS化け候補（縺/繧/繝系）', regex: /[縋縧繝闍螟]/g },
  // 制御文字
  { name: '制御文字', regex: /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g },
  // ゼロ幅文字（コピペで混入する場合あり）
  { name: 'ゼロ幅文字', regex: /[​-‏‪-‮﻿]/g },
  // 全角スペース連続（タイポ可能性）
  { name: '全角スペース3連以上', regex: /　{3,}/g },
  // ラテン拡張記号の単独混入（観測例：¸86 で 86 の前に U+00B8 が紛れる）
  // 数字や漢字の直前にこれらが出ていたら化けの可能性が高い
  { name: 'ラテン補助記号が数字/漢字の直前に混入', regex: /[¸¨´¯·°±¶§©®™][0-9０-９一-龥]/g },
];

// 重複・タイポ候補
const STRUCTURAL_PATTERNS = [
  // 同じ漢字の3回以上連続（タイポの可能性）
  { name: '同一漢字3連続', regex: /([一-龥])\1{2,}/g },
  // ひらがな5文字以上連続で「ですですです」のような繰り返し
  { name: '助動詞の重複', regex: /(です|ます|ました|ません)\1/g },
  // 句読点の連続
  { name: '句読点連続', regex: /[、。]{2,}/g },
  // 「、。」のような逆順
  { name: '句読点逆順', regex: /、。/g },
  // 半角括弧の片方だけ
  { name: '括弧不一致候補', regex: /\([^)]{50,}|（[^）]{50,}/g },
];

function machineCheck(text) {
  const findings = [];

  for (const pat of KNOWN_TYPO_PATTERNS) {
    const matches = [...text.matchAll(pat.regex)];
    if (matches.length) {
      findings.push({
        type: 'known_typo',
        severity: 'high',
        pattern: `${pat.wrong} → ${pat.right}`,
        context: pat.context,
        count: matches.length,
        samples: matches.slice(0, 3).map((m) => surroundContext(text, m.index, 20)),
      });
    }
  }

  for (const pat of MOJIBAKE_RANGES) {
    const matches = [...text.matchAll(pat.regex)];
    if (matches.length) {
      findings.push({
        type: 'mojibake',
        severity: 'high',
        pattern: pat.name,
        count: matches.length,
        samples: matches.slice(0, 5).map((m) => ({
          char: m[0],
          codepoint: 'U+' + m[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0'),
          context: surroundContext(text, m.index, 20),
        })),
      });
    }
  }

  for (const pat of STRUCTURAL_PATTERNS) {
    const matches = [...text.matchAll(pat.regex)];
    if (matches.length) {
      findings.push({
        type: 'structural',
        severity: 'medium',
        pattern: pat.name,
        count: matches.length,
        samples: matches.slice(0, 3).map((m) => ({
          match: m[0],
          context: surroundContext(text, m.index, 20),
        })),
      });
    }
  }

  return findings;
}

function surroundContext(text, idx, span) {
  const start = Math.max(0, idx - span);
  const end = Math.min(text.length, idx + span + 5);
  return (start > 0 ? '…' : '') + text.slice(start, end).replace(/\n/g, '⏎') + (end < text.length ? '…' : '');
}

// =========================================================
// [B] Gemini 文脈チェック（同音異義語・文脈依存の誤字）
// =========================================================

const GEMINI_CHECK_PROMPT = (text, articleDate) => `あなたは日本語校正のプロです。以下のCMS記事本文をスキャンし、
1. 文脈に合わない漢字（同音異義語の誤変換）
2. 不自然な助詞・助動詞の使い方
3. 文字化けの可能性（旧字・異体字・簡体字・ハングル等の混入）
4. 文末の繰り返し・係り受けの崩れ
5. 接続詞の論理破綻
を検出してください。

【★最重要：誤指摘を出さないための前提★】
- この記事は **${articleDate || '日付不明'}** 時点の市況ニュースです（あなたの知識カットオフより未来である可能性が高い）
- 固有名詞（人名・役職名）・数値（株価・金利・為替・商品相場・指標値）について、「自分の知識と違うから誤り」と判断するのは絶対NG
- 例：「ウォーシュFRB議長」「金1トロイオンス4500ドル」「日経平均6万4000円」のような、あなたの訓練データ時点と異なる事実は、すべて記事日付時点の前提として扱う
- 指摘するのは「日本語として明らかにおかしい」もののみ（漢字誤変換・助詞ミス・係り受け破綻・文字化け）

【判定ルール】
- 確信度の低い指摘は出さない（推測でいちいち指摘しない）
- 確信度の高いものだけ JSON で返す
- 固有名詞の事実誤認は指摘しない（記事日付時点の前提を疑わない）
- AI生成記事で特に出やすい誤字：踯→躯、瑤→瑕、隅→隣、銃→銀

【返却フォーマット（JSON のみ・コードフェンスなし）】
{
  "findings": [
    {
      "wrong": "誤った表記",
      "right": "正しい表記",
      "context": "前後20字程度のコンテキスト",
      "reason": "なぜ誤りと判断したか",
      "confidence": "high" | "medium" | "low"
    }
  ]
}
findingsが空なら {"findings": []} を返してください。

【対象本文】
${text}`;

// Salvage findings from incomplete JSON (Gemini sometimes truncates).
// Walk the text and extract complete { ... } blocks that look like findings.
function salvageFindings(text) {
  const findings = [];
  // Strip code fences if present
  let t = text.replace(/```(?:json)?/g, '');
  // Match each well-formed finding block (best effort)
  const blockRegex = /\{\s*"wrong"\s*:\s*"([^"]+)"\s*,\s*"right"\s*:\s*"([^"]+)"\s*,\s*"context"\s*:\s*"([^"]*)"\s*,\s*"reason"\s*:\s*"([^"]*)"\s*,\s*"confidence"\s*:\s*"(high|medium|low)"\s*\}/g;
  for (const m of t.matchAll(blockRegex)) {
    findings.push({ wrong: m[1], right: m[2], context: m[3], reason: m[4], confidence: m[5] });
  }
  return { findings };
}

async function geminiCheck(text, articleDate) {
  // 2回独立実行して、両方で検出されたものを「確定」、片方のみを「要確認」に分類
  console.log('  Gemini run 1/2...');
  const r1 = await gemini(GEMINI_CHECK_PROMPT(text, articleDate), { search: false, maxOutputTokens: 16000 });
  console.log(`  Gemini run 1: ${r1._modelUsed}`);
  console.log('  Gemini run 2/2...');
  const r2 = await gemini(GEMINI_CHECK_PROMPT(text, articleDate), { search: false, maxOutputTokens: 16000 });
  console.log(`  Gemini run 2: ${r2._modelUsed}`);

  let j1 = { findings: [] };
  let j2 = { findings: [] };
  try { j1 = jsonOfGemini(r1); } catch (e) {
    console.warn(`  [!] run 1 parse failed: ${e.message?.slice(0, 100)}`);
    // Salvage: try to extract findings array even from incomplete JSON
    j1 = salvageFindings(r1.text);
    console.warn(`  [salvaged] run 1: ${j1.findings.length} findings extracted from partial JSON`);
  }
  try { j2 = jsonOfGemini(r2); } catch (e) {
    console.warn(`  [!] run 2 parse failed: ${e.message?.slice(0, 100)}`);
    j2 = salvageFindings(r2.text);
    console.warn(`  [salvaged] run 2: ${j2.findings.length} findings extracted from partial JSON`);
  }

  const keyOf = (f) => `${f.wrong}|${f.right}`;
  const set1 = new Set((j1.findings || []).map(keyOf));
  const set2 = new Set((j2.findings || []).map(keyOf));

  const confirmed = [];
  const suspected = [];
  for (const f of (j1.findings || [])) {
    if (set2.has(keyOf(f))) confirmed.push({ ...f, agreement: 'both' });
    else suspected.push({ ...f, agreement: 'run1_only' });
  }
  for (const f of (j2.findings || [])) {
    if (!set1.has(keyOf(f))) suspected.push({ ...f, agreement: 'run2_only' });
  }

  return { confirmed, suspected, raw: { run1: j1, run2: j2 } };
}

// =========================================================
// Entry point
// =========================================================

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const articlePath = arg('--article');
const textArg = arg('--text');
const textFilePath = arg('--text-file');
const skipGemini = process.argv.includes('--skip-gemini');
const articleDateArg = arg('--date');

let text;
let outDir;
let articleTitle = '';
let articleDate = articleDateArg || '';
if (articlePath) {
  const article = JSON.parse(await fs.readFile(articlePath, 'utf8'));
  text = `${article.title}\n\n${article.metadescription || ''}\n\n${article.body || ''}`;
  articleTitle = article.title;
  articleDate = articleDate || article.date || article.dateISO || '';
  outDir = path.dirname(articlePath);
} else if (textFilePath) {
  text = await fs.readFile(textFilePath, 'utf8');
  articleTitle = `(text-file) ${path.basename(textFilePath)}`;
  outDir = path.dirname(textFilePath);
} else if (textArg) {
  text = textArg;
  outDir = process.cwd();
} else {
  console.error('Usage:');
  console.error('  node scripts/market-news/check-typos.mjs --article path/to/article.json [--skip-gemini]');
  console.error('  node scripts/market-news/check-typos.mjs --text-file path/to/text.txt --date 2026-05-24 [--skip-gemini]');
  console.error('  node scripts/market-news/check-typos.mjs --text "本文" --date 2026-05-24 [--skip-gemini]');
  process.exit(1);
}

console.log(`\n===== TYPO CHECK =====`);
console.log(`title: ${articleTitle}`);
console.log(`chars: ${text.length}`);
console.log('');

console.log('[A] 機械パターン検出...');
const machineFindings = machineCheck(text);
console.log(`  findings: ${machineFindings.length}`);
for (const f of machineFindings) {
  console.log(`  - [${f.severity}] ${f.pattern} (${f.count}件)`);
  for (const s of f.samples) {
    const ctx = typeof s === 'string' ? s : s.context || s.match || JSON.stringify(s);
    console.log(`      ${ctx}`);
  }
}

let geminiResult = null;
if (!skipGemini) {
  console.log('\n[B] Gemini文脈チェック（2回実行）...');
  console.log(`  記事日付前提: ${articleDate || '(指定なし)'}`);
  try {
    geminiResult = await geminiCheck(text, articleDate);
    console.log(`  confirmed (両run検出): ${geminiResult.confirmed.length}`);
    for (const f of geminiResult.confirmed) {
      console.log(`  ✓ ${f.wrong} → ${f.right} [${f.confidence}] ${f.context}`);
      console.log(`      理由: ${f.reason}`);
    }
    console.log(`  suspected (片run検出・要人手確認): ${geminiResult.suspected.length}`);
    for (const f of geminiResult.suspected) {
      console.log(`  ? ${f.wrong} → ${f.right} [${f.confidence}] (${f.agreement}) ${f.context}`);
      console.log(`      理由: ${f.reason}`);
    }
  } catch (e) {
    console.warn(`  [!] Gemini check failed: ${e.message}`);
  }
} else {
  console.log('\n[B] Gemini文脈チェック: --skip-gemini で skip');
}

const report = {
  title: articleTitle,
  chars: text.length,
  machine_findings: machineFindings,
  gemini: geminiResult,
  checked_at: new Date().toISOString(),
};

const reportPath = path.join(outDir, 'typo-check-report.json');
await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf8');

const hardFails = machineFindings.filter((f) => f.severity === 'high').length
  + (geminiResult?.confirmed.length || 0);
const softFails = machineFindings.filter((f) => f.severity === 'medium').length
  + (geminiResult?.suspected.length || 0);

console.log('\n===== TYPO CHECK DONE =====');
console.log(`hard fails (要修正)    : ${hardFails}`);
console.log(`soft fails (要人手確認) : ${softFails}`);
console.log(`report                : ${reportPath}`);
console.log('');

if (hardFails > 0) {
  console.log('⚠️  確定エラーあり：修正してから公開してください');
  process.exit(2);
}
if (softFails > 0) {
  console.log('⚠️  要確認項目あり：内容を確認してください');
  process.exit(0); // exit 0 (warn only)
}
console.log('✅ 文字化け・誤字は検出されませんでした');
