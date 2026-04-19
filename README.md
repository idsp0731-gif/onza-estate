# ONZA Estate ホームページ

Next.js + Tailwind CSS + Notion API で構築された不動産会社ホームページです。

## ローカル起動手順

1. リポジトリをクローン
2. 依存関係をインストール
   ```bash
   npm install
   ```
3. 環境変数を設定
   ```bash
   cp .env.local.example .env.local
   ```
   Notion APIキーとデータベースIDを入力
4. 開発サーバーを起動
   ```bash
   npm run dev
   ```
5. [http://localhost:3000](http://localhost:3000) で確認

## Notionデータベースの作り方

### ブログ記事データベース
- データベース名: Blog
- プロパティ:
  - Title (タイトル): Title
  - カテゴリ: Select (投資 / 売却 / 居住用 / 賃貸)
  - サムネイル: Files & media
  - 公開日: Date
  - 公開フラグ: Checkbox
  - スラッグ: Text

### 物件情報データベース
- データベース名: Properties
- プロパティ:
  - Title (物件名): Title
  - 種別: Select (投資用区分 / 投資用一棟 / 売却 / 居住用 / 賃貸)
  - エリア: Select (滋賀 / 京都 / 大阪 / その他)
  - 賃料または価格: Number
  - 間取り: Text
  - 築年数: Number
  - 最寄り駅: Text
  - 徒歩分数: Number
  - 物件画像: Files & media
  - 公開フラグ: Checkbox
  - おすすめフラグ: Checkbox

## Vercelへのデプロイ手順

1. Vercelアカウントを作成
2. GitHubリポジトリを接続
3. 環境変数を設定:
   - NOTION_API_KEY
   - NOTION_DATABASE_ID_BLOG
   - NOTION_DATABASE_ID_PROPERTIES
4. デプロイ

## 代表写真・ヒーロー画像の差し替え方法

- 代表写真: `src/components/About.tsx` の Image コンポーネントの src を変更
- ヒーロー画像: `src/components/Hero.tsx` の背景を画像に変更

## 物件情報の登録・更新方法

Notionデータベースで直接編集。公開フラグをオンにするとサイトに反映されます。

## 宅建業免許番号の差し替え箇所

`src/components/Footer.tsx` の宅建業免許部分を変更
