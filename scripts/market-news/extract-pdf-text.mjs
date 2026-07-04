// Extract Japanese text from PDF via Claude API (multimodal PDF support).
// Usage: node scripts/market-news/extract-pdf-text.mjs --pdf path/to/file.pdf --out tmp/source.txt
import './lib/env.mjs';
import fs from 'node:fs/promises';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const pdfPath = arg('--pdf');
const outPath = arg('--out');
if (!pdfPath || !outPath) {
  console.error('Usage: --pdf path/to/file.pdf --out path/to/out.txt');
  process.exit(1);
}

const pdfBuf = await fs.readFile(pdfPath);
const pdfBase64 = pdfBuf.toString('base64');
console.log(`PDF: ${pdfPath} (${(pdfBuf.length / 1024).toFixed(0)} KB)`);

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

const body = {
  model: 'claude-opus-4-7',
  max_tokens: 16000,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'document',
          source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 },
        },
        {
          type: 'text',
          text: `このPDFは日経テレコンの新聞記事です。
1ページ目から順番に、すべてのページの本文を日本語で正確に文字起こししてください。

【出力ルール】
- ヘッダー（「きょうの新聞」など）は無視
- フッター（「本サービスに関する〜」など著作権表示）は無視
- 各記事の見出し・本文・引用・コメントすべて含める
- 数字・固有名詞・人名は厳密に
- 各記事の冒頭に「==【記事X】出典・日付・タイトル==」のヘッダーを入れる
- 段落間は空行で区切る
- 引用符は「」、強調は"〜"を使う
- PDFが複数記事を含む場合は記事ごとに分けて出力する

【返却フォーマット】
直接文字起こしのテキストだけを返してください。前置きや説明は不要です。`,
        },
      ],
    },
  ],
};

console.log('Calling Claude API...');
const r = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
  },
  body: JSON.stringify(body),
});

if (!r.ok) {
  const txt = await r.text();
  console.error(`API error: ${r.status}`, txt.slice(0, 500));
  process.exit(1);
}

const j = await r.json();
const text = j.content.filter((c) => c.type === 'text').map((c) => c.text).join('').trim();

await fs.writeFile(outPath, text);
console.log(`Extracted ${text.length} chars → ${outPath}`);
console.log(`Tokens used: input=${j.usage?.input_tokens}, output=${j.usage?.output_tokens}`);
