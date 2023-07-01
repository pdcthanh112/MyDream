import type { AppProps } from 'next/app';
import Layout from './layout';

export default function App({ Component, pageProps, router }: any) {

  return (
    <Layout pageProps={pageProps} Component={Component} router={router}/>
  );
}

