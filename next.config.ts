import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "floraapi-production-e891.up.railway.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
