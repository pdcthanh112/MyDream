import React from 'react';
import './AppContent.module.scss';
import type { AppProps } from 'next/app';

const AppContent = ({ Component, pageProps, router }: AppProps) => {
  return ( 
    <Component {...pageProps} {...router}/>
  );
};

export default React.memo(AppContent);
