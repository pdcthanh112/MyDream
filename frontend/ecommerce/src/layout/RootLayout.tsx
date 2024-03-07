'use client';
import React from 'react';
import { Metadata } from 'next';

import AppHeader from '@components/AppHeader';
import AppFooter from '@components/AppFooter';
import AppNavbar from '@components/AppNavbar';
import styled from 'styled-components';
import { useAppSelector } from '@redux/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthModal from '@components/AuthModal';

import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

const HeaderComponent = styled.header`
  background-image: linear-gradient(to right, rgb(4, 171, 255), rgb(171, 235, 255));
`;

const BodyComponent = styled.main`
  width: 100%;
  min-height: 80vh;
`;

const FooterComponent = styled.footer`
  width: 100%;
`;

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Online Store",
  description: "The best online store on the internet.",
  openGraph: {
    title: "Online Store",
    description: "The best online store on the internet.",
    url: "https://example.com",
    siteName: "Online Store",
    type: "website",
    images: [
      {
        url: "https://example.com/og-img.jpg",
      },
    ],
  },
};

const RootLayout = ({ children }: LayoutProps) => {
  const openModalAuth = useAppSelector((state) => state.modalAuth.isOpenModalAuth);

  return (
    <html lang="en">
      <CustomMeta />
      <body className={inter.className}>
        <HeaderComponent>
          <AppHeader />
        </HeaderComponent>

        <AppNavbar />

        <BodyComponent>{children}</BodyComponent>

        <FooterComponent>
          <AppFooter />
        </FooterComponent>

        {openModalAuth && <AuthModal />}

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
};

export default RootLayout;

// export const getLayout = (page: React.ReactElement): React.ReactElement => <RootLayout>{page}</RootLayout>;

interface MetadataProps extends Metadata {
  title: string;
  keywords: string;
  description: string;
  url: string;
  thumbnailUrl: string;
};

export const CustomMeta = ({ title, keywords, description, url, thumbnailUrl }: MetadataProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content="CongThanh-Ecommerce" />
      <meta name="description" content="Ecommerce site for CongThanh-project app" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnailUrl} />
      <meta property="og:keywords" content={keywords} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={thumbnailUrl} />
      <meta property="twitter:keywords" content={keywords} />
    </Head>
  );
};

CustomMeta.defaultProps = {
  title: 'CongThanh E-commerce App',
  keywords: 'Ecommmerce App, NextJS, Amazon, Shopping',
  description: 'Ecommerce site of CongThanh-project App',
  url: 'my-dream-8uz66imd5-pdcthanh112.vercel.app',
  thumbnailUrl: 'thumbnailUrl',
};


