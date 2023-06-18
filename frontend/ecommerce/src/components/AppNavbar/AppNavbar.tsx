import Link from 'next/link';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppSidebar from '@components/AppSidebar';
import { Icon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AppNavbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const navbarItems = [
    { name: 'Today Deals', path: '/' },
    { name: 'Flash sale', path: '/' },
    { name: 'Gift Card', path: '/' },
    { name: 'Sell', path: '/' },
  ];
  return (
    <>
      <div className="flex items-center bg-blue-300 text-white space-x-6 p-2 pl-6">
        <p className="hover:cursor-pointer" onClick={() => setShowSidebar(!showSidebar)}>
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        {navbarItems.map((item, id) => (
          <Link key={id} href={item.path}>
            <p className="hover:cursor-pointer focus:underline">{item.name}</p>
          </Link>
        ))}
      </div>
      {showSidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-slate-500 bg-opacity-50 z-50">
          <div className="w-full h-full relative flex">
            <AppSidebar />
            <Icon component={CloseIcon} fontSize='large' className="hover:cursor-pointer" onClick={() => setShowSidebar(false)} />
          </div>
        </div>
      )}
    </>
  );
}
