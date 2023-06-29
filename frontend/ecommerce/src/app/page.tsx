import { AppProps } from 'next/app';
import Layout from './layout';

export default function App({ Component, pageProps, router }: AppProps) {

  return (
    <Layout pageProps={pageProps} Component={Component} router={router}/>
  );
}

