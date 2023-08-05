import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  )
};

export default appWithTranslation(App);

// export async function getServerSideProps({ locale, req, resolvedUrl }: any) {
//   // console.log('AAAAAAAAAAAAAAAAAAA', locale);
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// }
