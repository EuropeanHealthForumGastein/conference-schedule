import type { NextConfig } from 'next';

// The custom GitHub Pages domain serves the app from `/`. A base path can
// still be supplied explicitly for project-site deployments.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || '';

const nextConfig: NextConfig = {
  // Static HTML export (generates ./out for GitHub Pages)
  output: 'export',
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  // next/image optimization is disabled for static export unless you use a loader.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ehfg.org',
        port: '',
        pathname: '/fileadmin/**',
      },
    ],
  },
};

export default nextConfig;
