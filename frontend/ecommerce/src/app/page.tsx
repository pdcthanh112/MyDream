import { AppProps } from 'next/app';
import Layout from './layout';
import { NextComponentType, NextPage, NextPageContext } from 'next';
import { ReactElement, ReactNode } from 'react';
import { NextPageWithLayout } from '@pages/_app';

// // export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
// //   getLayout?: (page: ReactElement) => ReactNode
// // }

// // type AppPropsWithLayout = AppProps & {
// //   Component: NextComponentType<NextPageContext, any, any> & NextPageWithLayout;
// // };

// // export default function App({ Component, pageProps }: AppPropsWithLayout) {
// //   return (
// //     <Layout>
// //       <Component {...pageProps} />
// //     </Layout>
// //   );
// // }

const App: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

App.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default App;

