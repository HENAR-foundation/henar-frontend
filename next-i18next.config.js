const LocizeBackend = require('i18next-locize-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;
const LocalStorageBackend = require('i18next-localstorage-backend').default;

const isBrowser = typeof window !== 'undefined';

module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'hy', 'ru'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
    ...(isBrowser ? { localePath: path.resolve('./public/locales') } : {}),
  },
  debug: true,
//   backend: {
//     backendOptions: [
//       {
//         expirationTime: 60 * 60 * 1000, // 1 hour
//       },
//     ],
//     backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
//   },
};
