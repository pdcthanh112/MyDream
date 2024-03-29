/** 
 * @type {import('next').NextConfig}
 */
const { i18n } = require('./next-i18next.config');

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
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'firebasestorage.googleapis.com',
    //     port: '',
    //     pathname: '/ecommerce/product/**',
    //   },
    // ],   
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ['firebasestorage.googleapis.com', '*']
  },
};