const path = require('path');
module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi', 'zh', 'es'],
  },
  localePath: path.reslove('@i18n'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
