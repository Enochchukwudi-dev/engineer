import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        protocol: "https"
      },
      {
        hostname: "img.youtube.com",
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
  // Disable server-side compression for static media (prevents MP4 corruption)
  compress: false,
} as NextConfig;

export default nextConfig;
