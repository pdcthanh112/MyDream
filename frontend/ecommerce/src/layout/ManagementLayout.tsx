'use client';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ManageNavbar from '@components/ManageNavbar';

interface LayoutProps {
  children: React.ReactNode;
}

const ManagementLayout = ({ children }: LayoutProps) => {
  
  return (
    <div className="bg-white flex w-4/5 mx-auto">
      <ManageNavbar/>
      {children}
    </div>
  );
};

export default ManagementLayout;

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}
