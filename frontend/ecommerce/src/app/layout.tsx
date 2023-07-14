"use client"
import React, { ReactNode } from 'react';
import '@styles/globals.css';
import { Inter } from 'next/font/google';
import { CustomMeta as Metadata } from '@components/Metadata';
import Providers from './providers';

import AppHeader from '@components/AppHeader';
import AppFooter from '@components/AppFooter';
import AppNavbar from '@components/AppNavbar';
import styled from 'styled-components';

import { getAppData } from '@apis/appApi';
import { setAppData } from '@redux/features/appDataSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

const HeaderComponent = styled.div`
  background-image: linear-gradient(to right, rgb(4, 171, 255), rgb(171, 235, 255));
  width: 100%;
`;

const BodyComponent = styled.main`
  width: 100%;
  min-height: 80vh;
  display: inline-flex;
`;

const FooterComponent = styled.div`
  width: 100%;
`;

type RootLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en">
      {/* <html lang={locale}> */}
      <body className={inter.className}>
        <Metadata />
        <Providers>
          <HeaderComponent>
            <AppHeader />
          </HeaderComponent>

          <AppNavbar />

          <BodyComponent>{children}</BodyComponent>

          <FooterComponent>
            <AppFooter />
          </FooterComponent>
        </Providers>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}

// export const getStaticProps = async () => {
//   await getAppData().then((response) => {
//     if (response) {
//       store.dispatch(setAppData(response));
//     }
//   });
// };
