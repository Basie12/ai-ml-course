/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  // Static export for cPanel (API routes still work in `next start` / local `next dev`)
  ...(process.env.NEXT_OUTPUT === "export" ? { output: "export" } : {}),
};

module.exports = nextConfig;
