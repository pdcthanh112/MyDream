'use client';
import type { AppProps } from 'next/app';
import Layout from './layout';
import { getAppData } from '@apis/appApi';
import { useDispatch } from 'react-redux';
import { setAppData } from '@redux/features/appDataSlice';

export default function App({ Component, pageProps, router }: AppProps) {

  return (
    <Layout pageProps={pageProps} Component={Component} router={router}/>
  );
}

export const getStaticProps = async () => {
  const dispatch = useDispatch();
  const data = await getAppData().then(response => {
    if(response) {
      dispatch(setAppData(data));
    }
  });
};
