/** 
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    appDir: true
  },
  //reactStrictMode: true,
  compiler: {
    styledComponents: true,
    // emotion: true
  },
  rewrites: async () => {
    return [
      // { source: '/home', destination: '/home/Home' },
      { source: '/product-detail/:id', destination: '/product/ProductDetail/:id' },
    ];
  },
  redirects: async () => {
    return [
      { source: '/', destination: '/home', permanent: true },
      // { source: '/legacy', destination: '/new-home', permanent: false },
    ];
  },
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
  // images: {
  //   loaderFile: './src/assets/',
  // },
  // typescript: {
  //   ignoreBuildErrors: true
  // }
};