/** @type {import('next').NextConfig} */
module.exports = {
  // reactStrictMode: true,
  // compiler: {
  //     styledComponents: true,
  // },
   rewrites: async() => {
    return [
        { source: '/Goods/GoodsDetail', destination: '/goods-detail' }
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
};