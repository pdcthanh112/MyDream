// import path from 'path';
module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi', 'zh', 'es'],
    // localePath: path.reslove('./src/locales'),
  },
//   reloadOnPrerender: process.env.NODE_ENV === 'development',
};
