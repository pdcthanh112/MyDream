'use client';
import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import AppHeader from '@components/AppHeader';
import AppContent from '@components/AppContent';
import AppFooter from '@components/AppFooter';
import AppSidebar from '@components/AppSidebar';
import AppNavbar from '@components/AppNavbar';
import { Meta } from '@components/Metadata';

import styled from 'styled-components';
import { AppProps } from 'next/app';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce Website of CongThanh-project',
};

export default function Layout({ Component, pageProps, router }: AppProps) {
  const Header = styled.div`
    background-image: linear-gradient(to right, rgb(4, 171, 255), rgb(171, 235, 255));
  `;

  const Body = styled.div`
    width: 100%;
    min-height: 80vh;
    display: inline-flex;
  `;

  const Footer = styled.div`
    width: '100%';
  `;

  return (
    <html lang="en">
      <body className={inter.className}>
        <React.Fragment>
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
        </React.Fragment>
      </body>
    </html>
  );
}
