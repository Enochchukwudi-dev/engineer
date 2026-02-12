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
  // Ensure static files are served correctly
  headers: async () => {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          },
          {
            key: "Content-Type",
            value: "video/mp4"
          },
          {
            key: "Accept-Ranges",
            value: "bytes"
          }
        ]
      }
    ]
  },
  // Don't compress video files
  compress: true,
} as NextConfig;

export default nextConfig;
