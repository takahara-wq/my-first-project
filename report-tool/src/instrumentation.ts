export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.VERCEL) {
    const { ensureDatabaseReady } = await import("@/lib/database");
    ensureDatabaseReady();
  }
}
