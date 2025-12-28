// File: next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '202.10.34.176', // IP Strapi Anda
        port: '1337',              // Port Strapi Anda
        pathname: '/uploads/**',   // Folder gambar default Strapi
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;