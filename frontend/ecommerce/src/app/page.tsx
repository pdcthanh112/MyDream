import type { AppProps } from 'next/app';
import RootLayout from './layout';
import { NextComponentType, NextPage, NextPageContext } from 'next';
import { ReactElement, ReactNode } from 'react';

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
