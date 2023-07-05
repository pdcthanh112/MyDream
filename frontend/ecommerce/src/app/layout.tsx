import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { CustomMeta as Metadata } from '@components/Metadata';

import AppHeader from '@components/AppHeader';
import AppFooter from '@components/AppFooter';
import AppNavbar from '@components/AppNavbar';
import styled from 'styled-components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }): React.ReactElement {
  const HeaderComponent = styled.div`
  background-image: linear-gradient(to right, rgb(4, 171, 255), rgb(171, 235, 255));
  `;

  const BodyComponent = styled.div`
  width: 100%;
  min-height: 80vh;
  display: inline-flex;
  `;

  const FooterComponent = styled.div`
  width: 100%;
  `;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Metadata />

        <HeaderComponent>
          <AppHeader />
        </HeaderComponent>

        <AppNavbar />

        <BodyComponent>
          <main>{children}</main>
        </BodyComponent>

        <FooterComponent>
          <AppFooter />
        </FooterComponent>

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

export const getLayout = (page: React.ReactElement): React.ReactElement => <RootLayout>{page}</RootLayout>;

