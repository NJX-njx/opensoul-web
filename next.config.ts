import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  rewrites: async () => {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
    ];
  },
};

export default nextConfig;
