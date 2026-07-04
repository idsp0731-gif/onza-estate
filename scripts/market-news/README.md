# scripts/market-news

Notionの「📰 市況ニュース」コンテンツテンプレ（Claude Code指示書）を実装したパイプライン。

## 一番カンタンな使い方（Claude Codeで投稿する）

Claude Codeのチャットで：

```
/post-news
```

→ 記事ソース（テキストペースト / PDF添付 / URL）を聞かれるので渡す
→ 記事生成 → サムネ生成 → Cloudinaryアップ → Notion公開 → SNS原稿まで全自動

SNSだけ後追いで作りたい場合：

```
/post-sns
```

## CLIから直接動かす（各ステップを単体で実行）

### 環境
- Node.js v20+ 推奨
- `.env.local` に下記が必要：
  - `ANTHROPIC_API_KEY`
  - `OPENAI_API_KEY`
  - `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`
- 追加の依存パッケージは**ゼロ**（fetch/crypto等の標準APIで完結）

### 1. 記事生成（テキスト → article.json）

```bash
node scripts/market-news/generate-article.mjs --source path/to/source.txt
# → tmp/{slug}-{ts}/article.json を作成
# stdout 末尾に: ARTICLE_PATH=tmp/.../article.json
```

オプション：
- `--date 2026-05-16`（公開日上書き、デフォルトは今日 JST）
- `--out  out/dir`（出力ディレクトリ上書き）

### 2. サムネ画像生成 + Cloudinary アップロード

```bash
node scripts/market-news/generate-thumbnail.mjs --article tmp/{slug}-{ts}/article.json
# stdout 末尾に: THUMBNAIL_URL=https://res.cloudinary.com/...
```

最大3回まで生成→Claude(マルチモーダル)で承認/却下→却下なら hint を反映して再生成。3回ダメなら3枚目を警告付きで採用。

### 3. SNS原稿生成

```bash
node scripts/market-news/generate-sns.mjs --article tmp/{slug}-{ts}/article.json
# → tmp/{slug}-{ts}/sns/sns-script.md
```

draft → review → finalize（金商法NGワードチェック付き）。スライド11〜15枚 + キャプション + ハッシュタグ5個。

### 4. Notion投稿

CLI単独では行わない（NOTION_TOKEN がローカルにないため）。Claude Code 経由で MCP を叩く前提。

`/post-news` を使えば自動。手動で投稿する場合は、agentに：

```
tmp/{slug}-{ts}/article.json と thumbnail/cloudinary-url.txt を Notion に投稿して
```

と頼めば、agent が `notion-create-pages` を組み立てて公開する。

## ファイル構成

```
scripts/market-news/
├── README.md
├── lib/
│   ├── env.mjs              # .env.local をロード（ESM、無依存）
│   ├── anthropic.mjs        # Claude（モデルfallback付き、無依存）
│   ├── openai-image.mjs     # gpt-image-1（無依存）
│   └── cloudinary.mjs       # 署名付きアップロード（無依存）
├── generate-article.mjs     # ソース → article.json（4ステップ：要約→たたき→レビュー→仕上げ）
├── generate-thumbnail.mjs   # article.json → Cloudinary URL（コンセプト→生成→検証ループ→アップ）
└── generate-sns.mjs         # article.json → sns-script.md（draft→review→finalize）
```

## 出力構造

```
tmp/{slug}-{ts}/
├── source.txt            # 元の記事本文
├── article.json          # 投稿用データ（title/slug/date/meta/abstraction/themeKeywords/body）
├── final.md              # 人間用プレビュー
├── summary.json          # STEP 1 構造化サマリー
├── draft.json            # STEP 2 たたき
├── review.json           # STEP 3 レビュー指摘
├── thumbnail/
│   ├── concept.json      # 採用画像コンセプト
│   ├── image-attempt-N.png
│   ├── verify-N.json
│   ├── final-image.png
│   ├── thumbnail.json    # {cloudinary_url, attempts, concept_name}
│   ├── cloudinary.json
│   └── cloudinary-url.txt
└── sns/
    ├── sns-draft.json
    ├── sns-review.json
    ├── sns-script.json
    └── sns-script.md     # 投稿時の手元用
```

## 投稿先 Notion DB

| 用途 | ID |
| --- | --- |
| ブログ記事DB | `34881bfe-b2b6-80b9-90c7-d6cc491c7512` |
| ブログ記事 data source | `collection://34881bfe-b2b6-802c-8d0e-000b2412e499` |
| 市況ニュース テンプレページ | `35f81bfe-b2b6-818d-9cba-f8e47871bbc9` |

## 既知の制約

- **パイプライン構成（恒久ルール）**：文章生成は Claude（たたき）→ ChatGPT（レビュー）→ Claude（仕上げ）の3段APIで実装。チャット内でClaudeが直接書くのは禁止。スキル定義は `.claude/skills/cms-content-generation/SKILL.md`。
- PDFテキスト抽出：環境にOCRがない場合は、Claude Code内で添付画像をVisionで読み取って `tmp/source-{ts}.txt` に保存してから Step 2 に渡す。
- NOTION_TOKEN はローカル `.env.local` に**入れない**前提（Vercel環境変数のみ）。Notion投稿はMCP経由。
