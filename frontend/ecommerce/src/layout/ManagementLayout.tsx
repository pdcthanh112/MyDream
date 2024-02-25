'use client';
import React from 'react';
import ManageNavbar from '@components/ManageNavbar';

type LayoutProps = {
  children: React.ReactNode;
};

const ManagementLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-4/5 mx-auto my-3 px-3 py-2 flex gap-2">
      <div className='w-1/5'><ManageNavbar /></div>
      <div className='bg-white w-4/5 px-3 py-2'>{children}</div>
    </div>
  );
};

export default ManagementLayout;
