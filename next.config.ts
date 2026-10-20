import type { NextConfig } from "next";
import legacyRedirects from "./src/data/redirects.json";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // ~270 pages: fewer, busier workers keep peak memory low on 8-16 GB machines.
    staticGenerationMinPagesPerWorker: 70,
    staticGenerationRetryCount: 1,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
  async redirects() {
    return [
      // sampratitiexim.co.in (TradeIndia) URLs
      ...(legacyRedirects as [string, string][]).map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/products.html", destination: "/products-and-services", permanent: true },
      { source: "/contact-us.html", destination: "/enquiry", permanent: true },
      { source: "/company-profile.html", destination: "/profile", permanent: true },
      { source: "/hi/:path*", destination: "/", permanent: false },
      // sampratitiexim.in (IndiaMART) URLs
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:slug([a-z0-9-]+)\\.html", destination: "/:slug", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
