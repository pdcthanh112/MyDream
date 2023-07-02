import React from 'react';
import './AppContent.module.scss';
import type { AppProps } from 'next/app';

const AppContent = ({ Component, pageProps }: any) => {
  return ( 
    <Component {...pageProps}/>
  );
};

export default React.memo(AppContent);

// import type { AppProps } from "next/app";
// import { ReactNode } from "react";
// import { NextPage } from "next";

// type Page<P = {}> = NextPage<P> & {
//   getLayout?: (page: ReactNode) => ReactNode;
// };

// type Props = AppProps & {
//   Component: Page;
// };

// const AppContent = ({ Component, pageProps, router }: Props) => {
//   const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
//   return getLayout(<Component {...pageProps} />);
// };
// export default AppContent;