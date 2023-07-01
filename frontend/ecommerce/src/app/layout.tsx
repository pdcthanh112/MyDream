import React from 'react';
import { Metadata } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Meta } from '@components/Metadata';

import AppHeader from '@components/AppHeader';
import AppContent from '@components/AppContent';
import AppFooter from '@components/AppFooter';
import AppNavbar from '@components/AppNavbar';
import styled from 'styled-components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export const metadata: Metadata = {
//   title: 'Ecommerce',
//   description: 'Ecommerce Website of CongThanh-project',
// };

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ Component, pageProps, router }: any) {
  const Header = styled(React.Fragment)`
    background-image: linear-gradient(to right, rgb(4, 171, 255), rgb(171, 235, 255));
  `;

  const Body = styled(React.Fragment)`
    width: 100%;
    min-height: 80vh;
    display: inline-flex;
  `;

  const Footer = styled(React.Fragment)`
    width: '100%';
  `;

  return (
    <html lang="en">
      <body className={inter.className}>
          <Meta />
          <Header>
            <AppHeader />
          </Header>

          <AppNavbar />

          <Body>
            {/* <AppSidebar /> */}
            <AppContent Component={Component} pageProps={pageProps} router={router} />
          </Body>

          <Footer>
            <AppFooter />
          </Footer>

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
