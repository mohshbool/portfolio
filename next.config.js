/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/scss'],
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
    ],
  },
  // Enable i18n for multi-language support
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
