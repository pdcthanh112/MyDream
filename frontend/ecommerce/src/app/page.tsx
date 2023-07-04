import type { AppProps } from 'next/app';
import RootLayout from './layout';
import { NextComponentType, NextPage, NextPageContext } from 'next';
import { ReactElement, ReactNode } from 'react';
import { getAppData } from '@apis/appApi';
import { setAppData } from '@redux/features/appDataSlice';
import { store, persistor } from '@redux/store';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout): ReactElement {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);
  return <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>;
}

export const getStaticProps = async () => {
  await getAppData().then((response) => {
    if (response) {
      store.dispatch(setAppData(response));
    }
  });
};
