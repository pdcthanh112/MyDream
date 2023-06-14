// 'use client';
import type { AppProps } from 'next/app';
import Layout from './layout';
import { getAppData } from '@apis/appApi';
import { setAppData } from '@redux/features/appDataSlice';
import { store} from '@redux/store';
export default function App({ Component, pageProps, router }: AppProps) {

  return (
    <Layout pageProps={pageProps} Component={Component} router={router}/>
  );
}

export const getStaticProps = async () => {
  const data = await getAppData().then(response => {
    if(response) {
      store.dispatch(setAppData(response));
    }
  });
};
