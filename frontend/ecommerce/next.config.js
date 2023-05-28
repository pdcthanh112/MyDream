/** @type {import('next').NextConfig} */
module.exports = {
  // reactStrictMode: true,
  // compiler: {
  //     styledComponents: true,
  // },
  rewrites: async () => {
    return [
      { source: '/goods-detail/:id', destination: '/Goods/GoodsDetail/:id' }
      // { source: '/goods-detail/[id]', destination: '/Goods/GoodsDetail/[id]' }
      // { source: '/Goods/GoodsDetail', destination: '/goods-detail' }
    ];
  },
  //   redirects: async () => {
  //     return [
  //       { source: '/old-page', destination: '/new-page', permanent: true },
  //       { source: '/legacy', destination: '/new-home', permanent: false },
  //     ];
  //   },
  //   i18n: {
  //     locales: ['en', 'fr', 'de'],
  //     defaultLocale: 'en',
  //   },
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};