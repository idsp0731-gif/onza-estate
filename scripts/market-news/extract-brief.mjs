// One-shot: source article + editorial feedback → structured brief for the pipeline.
// Sends both to ChatGPT (gpt-5.5) and extracts:
//   - editorial points (what to emphasize, what to avoid)
//   - real-estate connection points (how to bridge to property investment)
//   - structural recommendations (H2 outline, tone)
// Outputs a brief file ready for generate-article.mjs --brief.
//
// Usage:
//   node scripts/market-news/extract-brief.mjs --source SRC --feedback FB --out OUT

import './lib/env.mjs';
import fs from 'node:fs/promises';
import { chatgpt, chatgptJson } from './lib/openai-chat.mjs';

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : null;
}

const sourcePath = arg('--source');
const feedbackPath = arg('--feedback');
const outPath = arg('--out');
if (!sourcePath || !feedbackPath || !outPath) {
  console.error('Usage: node extract-brief.mjs --source SRC --feedback FB --out OUT');
  process.exit(1);
}

const source = await fs.readFile(sourcePath, 'utf8');
const feedback = await fs.readFile(feedbackPath, 'utf8');

console.log(`source  : ${sourcePath} (${source.length} chars)`);
console.log(`feedback: ${feedbackPath} (${feedback.length} chars)`);

const prompt = `あなたは不動産・金融記事の編集者です。

下記の【元記事】と【編集者フィードバック】を読み、これから書き直す記事のための構造化編集ブリーフをJSON形式で抽出してください。

【絶対に守る前提（ONZA Estateの記事方針）】
- ONZA Estateは飯田舜平の不動産仲介ブランド
- 飯田氏の投資思想：
  - ローン最大活用、月次キャッシュフローは赤字でも長期積立で資産形成OK
  - 団信を活用した生命保険機能
  - 都心駅近RC区分派、利回りより資産性・流動性重視
  - 長期保有・出口で資産形成
  - 立地は「駅や需要のある場所からなるべく近い、需要が集まり同条件の供給が増えにくい場所」（用途地域・土地形状・周辺再開発の状況での希少性で判断）
- 文体は「です・ます」調、強調は半角ダブルクオート"~"
- 「日本売り」「暴落」など不安煽り表現NG、相対比較を強調
- 仮想敵叩き（「○○というよりも××」で誰も言ってない主張を否定）NG
- 国債・株式・不動産を一括りで「円建て資産全般」と扱う飛躍NG
- CTAで「~させてください」のへりくだり表現NG
- ONZAパートは精神論NG、思想と整合する定量指標で（返済比率50%以下のようなキャッシュ余力を残せ系はNG＝思想と逆）

【★ONZA定量指標で使ってよい数字／禁止の数字 ★】
- 使ってよい数字（飯田氏の思想と整合・確認済）：
  - 金利+1.0%／+2.0% のストレステスト
  - 空室3〜6カ月の持ち出し試算
  - 賃料維持力の比較（同一駅・同一広さ帯で築10年差の賃料、直近3〜5年の募集賃料推移）
- 使ってはいけない数字（業界一般のセオリーで飯田氏推奨ではない）：
  - 駅徒歩○分以内（例：5〜7分以内）→ NG。代わりに「駅や需要のある場所からなるべく近い、同条件の供給が増えにくい立地」と記述
  - 返済比率○%以下（例：50%以下）→ NG。飯田氏は月次キャッシュ赤字を許容する積立思想なので逆
  - 賃貸募集○カ月以内（例：1〜2カ月以内）→ 推奨されている数字ではないので原則NG。「短期間で決まりやすいエリアか」と定性的に記述
- ルール：onza_quantitative_indicatorsで rule_of_thumb に数字を入れる場合は、上記「使ってよい数字」リストに該当するもののみ。それ以外は数字を入れず、定性的な観点だけ書く

【返却JSON】
{
  "core_question": "記事全体で答える1つの問い（不動産投資家向け）",
  "core_answer": "その問いへの結論（1-2文）",
  "key_facts": ["元記事から拾う核となる事実・数字"],
  "key_quotes": ["元記事から拾う有用な引用とその文脈"],
  "what_to_emphasize": ["強調すべき論点"],
  "what_to_avoid": ["フィードバックを踏まえた避けるべき表現や構造"],
  "real_estate_bridges": [
    {
      "axis": "流動性 or 需要 or 投資マインド or 価格",
      "category_split": "どのカテゴリにどう影響するか（カテゴリ別の差別化）",
      "specific_examples": "具体的な物件タイプや判断材料"
    }
  ],
  "onza_quantitative_indicators": [
    {"name": "指標名", "description": "観点", "rule_of_thumb": "思想と整合する数字（あれば）"}
  ],
  "structural_recommendations": {
    "h2_outline": ["H2タイトル候補6本（標準名ベース・軽アレンジ可）"],
    "tone_notes": "全体トーンに関する注意",
    "thumbnail_concept_hint": "サムネのコンセプト方向"
  },
  "title_candidates": ["タイトル案2-3本（〜｜ONZA的市況ニュース）"]
}

【元記事】
${source}

【編集者フィードバック】
${feedback}`;

console.log('\n[1/1] Extracting structured brief from ChatGPT (gpt-5.5)...');
const res = await chatgpt([{ role: 'user', content: prompt }], { max_tokens: 6000 });
console.log(`  model: ${res._modelUsed}`);

const extracted = chatgptJson(res);
const json = JSON.stringify(extracted, null, 2);

// Convert structured JSON into a brief text the article pipeline can consume.
const briefText = `【ChatGPT抽出ブリーフ（編集者フィードバック反映済）】

【core_question】
${extracted.core_question}

【core_answer】
${extracted.core_answer}

【記事の核となる事実・数字】
${(extracted.key_facts || []).map((f) => `- ${f}`).join('\n')}

【拾うべき引用】
${(extracted.key_quotes || []).map((q) => `- ${q}`).join('\n')}

【強調すべき論点】
${(extracted.what_to_emphasize || []).map((w) => `- ${w}`).join('\n')}

【★絶対に避けるべき表現・構造★】
${(extracted.what_to_avoid || []).map((w) => `- ${w}`).join('\n')}

【不動産との接続（カテゴリ差別化で書く）】
${(extracted.real_estate_bridges || []).map((b) => `- ${b.axis}：${b.category_split}\n  例：${b.specific_examples}`).join('\n')}

【ONZA定量指標（飯田氏思想と整合・必ず本文に入れる）】
${(extracted.onza_quantitative_indicators || []).map((i) => `- ${i.name}：${i.description}${i.rule_of_thumb ? ` / 目安：${i.rule_of_thumb}` : ''}`).join('\n')}

【H2構成案（標準名ベース・軽アレンジ可）】
${(extracted.structural_recommendations?.h2_outline || []).map((h) => `- ${h}`).join('\n')}

【全体トーン】
${extracted.structural_recommendations?.tone_notes || ''}

【タイトル方向案】
${(extracted.title_candidates || []).map((t) => `- ${t}`).join('\n')}

【サムネコンセプト方向】
${extracted.structural_recommendations?.thumbnail_concept_hint || ''}
`;

await fs.writeFile(outPath, briefText);
await fs.writeFile(outPath.replace(/\.txt$/, '.json'), json);
console.log(`\nBrief written: ${outPath}`);
console.log(`  size: ${briefText.length} chars`);
console.log(`Raw JSON also at: ${outPath.replace(/\.txt$/, '.json')}`);
