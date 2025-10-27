import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://readvio-backend.vercel.app/api/:path*", // proxy to backend
      },
    ];
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
