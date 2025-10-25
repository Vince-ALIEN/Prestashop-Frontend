// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler
  reactCompiler: true,
  reactStrictMode: true,

  // ✅ Configuration images optimale pour PrestaShop
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextps.panel-ufo.fr',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // ✅ AVIF + WebP
    minimumCacheTTL: 60, // ✅ AJOUT : Cache 60 secondes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // ✅ Vos tailles
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // ✅ Vos breakpoints
  },

  // ✅ Multilingue (si vous voulez FR + EN)
  i18n: {
    locales: ['fr', 'en'], // Français par défaut, puis anglais
    defaultLocale: 'fr',
    localeDetection: true, // Détection auto de la langue du navigateur
  },

  // Optimisations
  compress: true,
  
  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;