/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'henar-static.ams3.digitaloceanspaces.com',
        port: '',
        // pathname: '/image/upload/**',
      },
    ],
  },
  tslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'hy'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
