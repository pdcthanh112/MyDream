"use client";
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from './layout';
import { getAppData } from '@apis/appApi';
import { useDispatch } from 'react-redux';
import { setAppData } from '@redux/features/appDataSlice';

export default function App({ Component, pageProps, router }: AppProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    getAppData().then((response) => {
      if (response) {
        dispatch(setAppData(response));
      }
    });
  }, []);
  return (
    <Layout>
      <Component {...pageProps} {...router} />
    </Layout>
  );
}
