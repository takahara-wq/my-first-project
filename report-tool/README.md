# 株式会社ハイランド・ハウス 顧客ポータル

第4回月次課題：**データの永続化**（Prisma + SQLite）

## 技術構成

| 項目 | 採用 |
|------|------|
| フレームワーク | Next.js (App Router) |
| 言語 | TypeScript |
| スタイル | Tailwind CSS |
| UI | shadcn/ui |
| ORM | Prisma 5 |
| DB | SQLite（`prisma/dev.db`） |
| デプロイ | Vercel |

## 機能一覧

- **① 顧客一覧表示** — 顧客名・住所・電話番号
- **② 顧客登録** — 新規追加・編集・削除
- **③ 顧客検索** — 顧客名で部分一致検索
- **④ データ保存** — SQLite に永続化
- **⑤ 永続化確認** — ブラウザをリロードしてもデータが残る

## 画面構成

- **左ペイン** — 検索・新規追加・顧客一覧
- **右ペイン** — 選択した顧客の詳細・編集フォーム

URL: http://localhost:3000/workspace

---

## ステップ1：依存関係のインストール

```bash
cd report-tool
npm install
```

## ステップ2：環境変数の設定

`.env` ファイル（既に作成済み）:

```env
DATABASE_URL="file:./dev.db"
```

## ステップ3：Prisma スキーマの確認

`prisma/schema.prisma` に Customer モデルを定義しています。

```prisma
model Customer {
  id        String   @id @default(cuid())
  name      String   // 顧客名
  address   String   // 住所
  phone     String   // 電話番号
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## ステップ4：DB 構築（テーブル作成）

```bash
npm run db:push
```

`prisma/dev.db` が作成されます。

## ステップ5：サンプルデータ投入（任意）

```bash
npm run db:seed
```

顧客4件のサンプルが登録されます。

## ステップ6：開発サーバー起動

```bash
npm run dev
```

ブラウザで http://localhost:3000/workspace を開きます。

> **ERR_CONNECTION_REFUSED が出る場合**  
> 開発サーバーが起動していません。上記 `npm run dev` を実行してください。

## ステップ7：動作確認チェックリスト

1. 左に顧客一覧が表示される
2. 顧客をクリック → 右に詳細が表示される
3. 「新規顧客を追加」→ 登録 → 一覧に追加される
4. 編集 → 「更新する」→ 内容が変わる
5. 「削除」→ 一覧から消える
6. 検索欄に名前を入力 → 「検索」→ 絞り込まれる
7. **ページをリロード（F5）** → データが残っている ✅

## ステップ8：DB の中身を確認（任意）

```bash
npm run db:studio
```

Prisma Studio が開き、テーブル内容をGUIで確認できます。

---

## ファイル構成（課題提出用）

```
report-tool/
├── prisma/
│   ├── schema.prisma      ← Prismaスキーマ
│   ├── seed.ts              ← サンプルデータ
│   └── dev.db               ← SQLiteファイル（自動生成）
├── src/
│   ├── app/
│   │   ├── actions/customers.ts   ← 保存処理（CRUD）
│   │   └── workspace/page.tsx     ← 顧客ポータル画面
│   ├── components/portal/
│   │   └── customer-portal.tsx    ← UI（左一覧・右詳細）
│   └── lib/prisma.ts              ← Prismaクライアント
└── .env                           ← DB接続設定
```

## 保存処理の仕組み

`src/app/actions/customers.ts` の Server Actions が SQLite に読み書きします。

| 関数 | 処理 |
|------|------|
| `getCustomers(query)` | 一覧取得・名前検索 |
| `createCustomer(data)` | 新規登録 |
| `updateCustomer(id, data)` | 更新 |
| `deleteCustomer(id)` | 削除 |

保存後は `revalidatePath("/workspace")` で画面を最新化します。

---

## Vercel 公開手順

### 1. GitHub にプッシュ

```bash
git add .
git commit -m "顧客ポータル（Prisma + SQLite）"
git push origin main
```

### 2. Vercel でプロジェクト作成

1. https://vercel.com にログイン
2. **Add New Project** → リポジトリを選択
3. **Root Directory** を `report-tool` に設定
4. **Environment Variables** に追加:
   ```
   DATABASE_URL=file:./dev.db
   ```
5. **Deploy**

### 3. ビルド設定

`package.json` の `build` スクリプトに `prisma generate` が含まれているため、Vercel ビルド時に Prisma Client が自動生成されます。

### ⚠️ SQLite と Vercel について（重要）

Vercel はサーバーレス環境のため、**ローカルの SQLite ファイルは本番で永続化されません**。

| 環境 | 永続化 |
|------|--------|
| ローカル（`npm run dev`） | ✅ `prisma/dev.db` に保存される |
| Vercel 本番 | ❌ ファイルは再起動で消える |

**課題提出のおすすめ:**

- **デモ・永続化確認** → ローカルで実施（ステップ7）
- **Vercel 公開** → 画面のデプロイ確認用として利用
- **本番でDB永続化が必要な場合** → [Turso](https://turso.tech/)（SQLite互換クラウドDB）への移行を検討

---

## よく使うコマンド

```bash
npm run dev        # 開発サーバー起動
npm run build      # 本番ビルド
npm run db:push    # スキーマをDBに反映
npm run db:seed    # サンプルデータ投入
npm run db:studio  # DB内容をGUI確認
```
