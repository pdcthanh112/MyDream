import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextComponentType, NextPage, NextPageContext } from 'next';
import RootLayout from './layout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & NextPageWithLayout;
};

export default function App({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);
  return <RootLayout>{getLayout(<Component {...pageProps} {...router} />)}</RootLayout>;
}
