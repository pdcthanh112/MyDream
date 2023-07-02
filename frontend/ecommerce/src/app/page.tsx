// import type { AppProps } from 'next/app';
// import Layout from './layout';
// import { NextComponentType, NextPage, NextPageContext } from 'next';
// import { ReactElement, ReactNode } from 'react';

// type NextPageWithLayout = NextPage & {
//   getLayout?: (page: ReactElement) => ReactNode
//   Component?: NextComponentType<NextPageContext, any, any>
// }

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout
// }

// export default function App({ Component, pageProps }: AppPropsWithLayout) {
//   // return <Layout Component={Component} pageProps={pageProps} router={router} />;
//   // const getLayout = Component.getLayout ?? (page => page);
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }

import type { AppProps } from 'next/app';
import Layout from './layout';
import { NextComponentType, NextPage, NextPageContext } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
