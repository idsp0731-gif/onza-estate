#!/usr/bin/env node
// Threads単発投稿生成パイプライン
// Step1: このセッション(Claude Code)でたたき → draft.json
// Step2: 最新GPT(gpt-5.5)でフック・導線レビュー
// Step3: 最新Claude(claude-opus-4-8)で仕上げ
// Step4: このセッションで最終チェック + docx化
//
// 使用方法:
//   node scripts/threads/generate-threads.mjs --draft tmp/threads/draft-NN-{slug}.json --out tmp/threads/final-NN-{slug}.json

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

// ── .env.local 読み込み ─────────────────────────────────────
function loadEnv() {
  const envPath = path.join(PROJECT_ROOT, ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("エラー: .env.local が見つかりません:", envPath);
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnv();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("エラー: ANTHROPIC_API_KEY が .env.local にありません");
  process.exit(1);
}
if (!OPENAI_API_KEY) {
  console.error("エラー: OPENAI_API_KEY が .env.local にありません");
  process.exit(1);
}

// ── 引数 ──────────────────────────────────────────────────
const argv = process.argv.slice(2);
function getArg(name) {
  const i = argv.indexOf(name);
  if (i < 0) return null;
  return argv[i + 1];
}
const draftPath = getArg("--draft");
const outPath = getArg("--out");
if (!draftPath || !outPath) {
  console.error(
    "使用方法: node scripts/threads/generate-threads.mjs --draft <draft.json> --out <final.json>"
  );
  process.exit(1);
}

const draftAbs = path.isAbsolute(draftPath)
  ? draftPath
  : path.join(PROJECT_ROOT, draftPath);
const outAbs = path.isAbsolute(outPath)
  ? outPath
  : path.join(PROJECT_ROOT, outPath);

const draft = JSON.parse(fs.readFileSync(draftAbs, "utf-8"));

const CTA_FIXED =
  "詳しい解説と個別のご相談は、プロフィールのリンクから（HP記事・LINE）どうぞ。";

// ── API 呼び出し ───────────────────────────────────────────
async function callGPT(systemPrompt, userPrompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-5.5",
      max_completion_tokens: 16000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API エラー ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callClaude(systemPrompt, userPrompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-opus-4-8",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API エラー ${res.status}: ${err}`);
  }
  const data = await res.json();
  const textBlocks = data.content.filter((b) => b.type === "text");
  return textBlocks.map((b) => b.text).join("");
}

function stripFence(s) {
  return s
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();
}

// ── Step 2: GPT-5.5 フック・導線の「指摘出し」（本文は書き換えない）───
const step2System = `これは「Threads（スレッズ）」というSNSへ投稿する単発テキストのレビューです。あなたは編集アドバイザー。たたき原稿を読み、フック・論理導線・リズム・CTAの観点で「修正点・強化点」を箇条書きで指摘してください。

**重要：あなたは本文を書き換えません。** 直した本文は出力せず、後工程の書き手（別AI）が使う"指摘リスト"だけを返します。具体的にどこをどう強くするかを、書き手が実行できる粒度で書いてください。

【Threadsという媒体】
- タイムラインで他の投稿に混じって流し読みされる。最初の1〜2行でスクロールを止められなければ読まれない。
- 縦に流れる短文SNS。ただし「1フレーズごとに改行」して細切れにするとブツ切れで頭に入らず、かえってヘボく見える。意味の塊（2〜3文）でまとめ、塊と塊の間に空行を1つ入れて"間"を作るのが読みやすい。リズムと語りの勢いが命。
- 投稿者は実在の専門家。淡々とした説明文ではなく、一人の人間が語りかける温度を残す。

【著者像】飯田舜平。元・京都ワンルームデベのトップ営業→現エージェント。スタンスは「条件付き擁護」。お金は手段・目的逆算・分散×インカム・都心駅近RC区分派・変動金利推奨・ローン肯定・預金最小化。

【指摘の観点】
- フック：冒頭1〜2行でスクロールを止められるか。違和感・問題提起のキレがあるか。弱ければどう尖らせるか具体案。
- 導線：話の運びに飛び・重複・冗長がないか。途中で離脱しそうな箇所はどこか。
- 因果（なぜ）の説明：市場の動き・数字（株高・利回り低下・価格変動など）に触れているのに「なぜそうなるか（伝達メカニズム）」が無く結果の羅列で終わっていないか（★恒久ルール2026-06-16飯田氏「全ての記事で因果をしっかり説明」）。抜けていれば短い一手で因果を補う具体案を出す（例：原油安→物価/利上げ圧力低下→金利低下／株はコスト減・金利低下・リスク後退で上昇）。ただし字数は500字以内・断定しすぎない。
- リズム/改行：細切れすぎ／塊が大きすぎないか。語りの勢いが削がれている箇所はどこか。
- CTA：末尾が定型「${CTA_FIXED}」と完全一致しているか。
${draft.category === "market-news" ? "- 冒頭ラベル：1行目が「【今日の市況ニュース】」であるか（市況ニュース由来の投稿の固定仕様。**削除・変更の提案はしない**。フックはラベルの次の行から評価する）。" : "- 冒頭ラベル：この投稿は**投資メディア記事のThreads**であり、「【今日の市況ニュース】」等の冒頭ラベルは**付けない**（ラベルは市況ニュース記事専用の仕様）。もし冒頭にラベルがあれば「削除」を指摘する。フックは1行目から評価する。"}
- 内容ルール違反の検出（あれば必ず指摘）：500字超過／前提なしの数字単独／藁人形（「よく聞く」「と言われがち」）／「させてください」「短期売買」／不動産全般をワンルームに限定／収益源泉に売却益を並べている、等。

【出力フォーマット】(必ずJSONのみ。他の文字を含めない。本文は入れない)
{
  "keep": ["活きている・残すべき良い点", "..."],
  "fixes": ["修正点（どこを→どう）を実行可能な粒度で", "..."],
  "boosts": ["さらに強くできる強化点（任意・あれば）", "..."],
  "rule_flags": ["内容ルール違反の指摘。なければ空配列"],
  "cta_check": "CTA定型と一致しているかの所見"
}`;

const step2User = `【記事タイトル】
${draft.title}

【記事の核となる主張・要点メモ】
${draft.draft_notes || ""}

【たたき原稿(セッション執筆・Threads投稿用)】
${draft.body}

このたたきへの修正点・強化点を箇条書きでJSON出力してください。本文の書き換えはしないでください。`;

console.log("[1/2] ChatGPT(gpt-5.5)で修正点・強化点を抽出（仕上げはセッション）...");
const step2Raw = await callGPT(step2System, step2User);
let step2Parsed;
try {
  step2Parsed = JSON.parse(stripFence(step2Raw));
} catch (e) {
  console.error("ChatGPT出力がJSONでない:");
  console.error(step2Raw);
  process.exit(1);
}
const fmtList = (a) => (Array.isArray(a) && a.length ? a.map((x) => "      - " + x).join("\n") : "      (なし)");
console.log("  keep :\n" + fmtList(step2Parsed.keep));
console.log("  fixes:\n" + fmtList(step2Parsed.fixes));
console.log("  boosts:\n" + fmtList(step2Parsed.boosts));
console.log("  flags:\n" + fmtList(step2Parsed.rule_flags));
console.log("  cta  :", step2Parsed.cta_check);

// ── Step 3 は廃止：仕上げはこのセッション(Claude Code)で行う ──
// 飯田氏指示2026-06-08「パイプラインの仕上げ部分はClaude APIからこのセッションで行う」。
// Claude APIに投げると字数オーバー・ルール逸脱（市況ラベル誤付与・唐突な否定など）の
// 手戻りが多かったため、Step2(GPT指摘出し)で停止し、たたき＋指摘を保存。
// セッションがこのreviewを読み、その場で仕上げ→final JSON→docx化する。

// ── 保存 ──────────────────────────────────────────────────
const out = {
  draft_path: draftPath,
  draft_meta: {
    article_id: draft.article_id,
    slug: draft.slug,
    title: draft.title,
    publish_date: draft.publish_date,
    category: draft.category || "invest",
  },
  draft_body: draft.body,
  draft_notes: draft.draft_notes || "",
  step2_review: step2Parsed,
  // body_final はセッションが仕上げてここに追記する（API では生成しない）
  body_final: null,
};
fs.mkdirSync(path.dirname(outAbs), { recursive: true });
fs.writeFileSync(outAbs, JSON.stringify(out, null, 2), "utf-8");
console.log("\n[2/2] GPT指摘を保存しました（仕上げはセッションで実施）:", outAbs);
