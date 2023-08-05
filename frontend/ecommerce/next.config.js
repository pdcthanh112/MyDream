/** 
 * @type {import('next').NextConfig}
 */
const path = require('path')
const { i18n } = require('./next-i18next.config.ts')
module.exports = {
  reactStrictMode: true,
  experimental: {
    // appDir: true,
    serverActions: true
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    // emotion: true
  },
  rewrites: async () => {
    return [
      // { source: '/product-detail/:id', destination: '/product/product-detail/:id' },
    ];
  },
  redirects: async () => {
    return [
      { source: '/', destination: '/home', permanent: false },
    ];
  },
  i18n,
  // i18n: {
  //   locales: ['en', 'vi', 'zh', 'es'],
  //   defaultLocale: 'en',
  //   // localePath: path.resolve('./src/locales'),
  // },
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  // images: {
  //   loaderFile: './src/assets/',
  // },
  // typescript: {
  //   ignoreBuildErrors: true
  // }
};