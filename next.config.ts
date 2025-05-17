import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // for temporary purpose
  },
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
