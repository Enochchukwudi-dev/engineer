import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        protocol: "https"
      }
    ]
  },
  // Performance optimizations
  onDemandEntries: {
    maxInactiveAge: 60000,
    pagesBufferLength: 5,
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Fast refresh settings
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Disable gzip compression to prevent video corruption
  compress: false,
} as NextConfig;

export default nextConfig;
