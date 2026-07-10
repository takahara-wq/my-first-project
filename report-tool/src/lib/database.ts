import { execSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const VERCEL_TMP_DB = path.join(os.tmpdir(), "portal.db");
const BUNDLED_DB = path.join(/* turbopackIgnore: true */ process.cwd(), "prisma", "dev.db");

/** Vercel 本番では tmp ディレクトリ、ローカルでは .env の DATABASE_URL を使う */
export function resolveDatabaseUrl(): string {
  if (process.env.VERCEL) {
    return `file:${VERCEL_TMP_DB}`;
  }
  return process.env.DATABASE_URL ?? "file:./dev.db";
}

/** Vercel サーバーレス向け: ビルド時 DB を tmp にコピー（なければ初期化） */
export function ensureDatabaseReady(): void {
  if (!process.env.VERCEL) return;
  if (fs.existsSync(VERCEL_TMP_DB)) return;

  if (fs.existsSync(BUNDLED_DB)) {
    fs.copyFileSync(BUNDLED_DB, VERCEL_TMP_DB);
    return;
  }

  const url = `file:${VERCEL_TMP_DB}`;
  execSync("npx prisma db push --skip-generate", {
    env: { ...process.env, DATABASE_URL: url },
    stdio: "pipe",
  });
  execSync("npx tsx prisma/seed.ts", {
    env: { ...process.env, DATABASE_URL: url },
    stdio: "pipe",
  });
}
