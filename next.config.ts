// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Désactiver le React Compiler
  // reactCompiler: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextps.panel-ufo.fr',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
