/** 
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    appDir: true
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
  i18n: {
    locales: ['en', 'vi', 'de'],
    defaultLocale: 'en',
  },
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