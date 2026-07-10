import { PrismaClient } from "@prisma/client";

import { ensureDatabaseReady, resolveDatabaseUrl } from "@/lib/database";

if (process.env.VERCEL) {
  ensureDatabaseReady();
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: resolveDatabaseUrl() },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

globalForPrisma.prisma = prisma;
