'use client';
import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import AppHeader from '@components/AppHeader';
import AppContent from '@components/AppContent';
import AppFooter from '@components/AppFooter';
import AppSidebar from '@components/AppSidebar';
import MetaComponent from '@components/MetaComponent';

import styled from 'styled-components';
import AppNavbar from '@components/AppNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce Website of CongThanh-project',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const Header = styled.div`
    background-image: linear-gradient(
      to right,
      rgb(4, 171, 255),
      rgb(171, 235, 255)
    );
  `;

  const Body = styled.div`
    width: 100vw;
    min-height: 80vh;
    display: inline-flex;
  `;

  const Footer = styled.div`
    width: '100vw';
  `;

  return (
    <html lang="en">
      <body className={inter.className}>
        <React.Fragment>
          <MetaComponent />
          <Header>
            <AppHeader />
          </Header>

          <AppNavbar />

          <Body>
            <AppSidebar />
            <AppContent />
            {/* <AppContent>{children}</AppContent> */}
          </Body>

          <Footer>
            <AppFooter />
          </Footer>
        </React.Fragment>
      </body>
    </html>
  );
}
