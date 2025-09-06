import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3dev.pjc.mt.gov.br',
        port: '', 
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
