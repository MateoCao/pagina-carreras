import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
          bodySizeLimit: '2mb',
        },
      },
    images: {
        domains: ['carrerastablfiles.s3.us-east-2.amazonaws.com'],
      },
};

export default nextConfig;
