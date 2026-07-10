import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/portal",
        destination: "/workspace",
        permanent: false,
      },
    ];
  },
  // ビルド時に作成した SQLite をサーバーレス関数へ同梱
  outputFileTracingIncludes: {
    "/*": ["./prisma/dev.db"],
    "/workspace": ["./prisma/dev.db"],
  },
};

export default nextConfig;
