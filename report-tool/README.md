# 工程報告ツール（設計図解）

塗装工事の突発的天候変化に伴う工程変更通知フローを可視化する設計図ページです。

## 技術スタック

| 項目 | 採用 |
|------|------|
| フレームワーク | Next.js (App Router) |
| 言語 | TypeScript |
| スタイル | Tailwind CSS |
| UI | [shadcn/ui](https://ui.shadcn.com/) |
| デプロイ | [Vercel](https://vercel.com/) |

新しい UI 部品は **shadcn/ui から追加**してください。

```bash
npx shadcn@latest add <component-name>
```

## 開発

```bash
cd report-tool
npm install
npm run dev
```

http://localhost:3000 で設計図を確認できます。

## Vercel へのデプロイ

1. [Vercel](https://vercel.com/) にログイン
2. **Add New Project** → このリポジトリをインポート
3. **Root Directory** を `report-tool` に設定
4. Framework Preset: **Next.js**（自動検出）
5. Deploy

CLI の場合:

```bash
cd report-tool
npx vercel
```

## 構成

```
src/
├── app/page.tsx          # 設計図トップ
├── components/design/    # 図解セクション
├── components/ui/        # shadcn/ui
└── lib/design-data.ts    # 文言・テーマ定義
```
