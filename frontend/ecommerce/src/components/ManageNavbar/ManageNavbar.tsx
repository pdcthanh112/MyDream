import React from 'react';
import { Customer } from '@models/type';
import { useAppSelector } from '@redux/store';
import Image from 'next/image';
import DefaultImage from '@assets/images/default-image.jpg';
import Link from 'next/link';
import path from '@config/path';
import { useTranslation } from 'next-i18next';
import { Avatar } from '@mui/material';

type NavBarItemProps = {
  name: string;
  image: string;
  url: string;
  className?: string;
};

const NavBarItem = ({ name, image, url, className }: NavBarItemProps) => (
  <Link href={url} className={`flex ${className}`}>
    <Image src={image} alt={name} width={20} height={20} />
    <span className="ml-1">{name}</span>
  </Link>
);

const ManageNavbar = () => {
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const { t } = useTranslation('common');

  return (
    <div className="px-3 py-2 flex flex-col">
      <div className="flex border-b-2 border-gray-300 pb-2">
       <div className='rounded-full'> <Image src={currentUser.userInfo.image || DefaultImage} alt={currentUser.userInfo.name} width={40} height={40} className='rounded-full'/></div>
        {/* <Avatar src={currentUser.userInfo.image || String(DefaultImage)} /> */}
        <span className="font-semibold flex items-center ml-3">{currentUser.userInfo.name}</span>
      </div>
      <div className="flex flex-col">
        <NavBarItem name={t('manage.profile')} image="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4" url={path.profile} />

        <div className="ml-3 flex flex-col">
          <Link href={path.changePassword}>Change password</Link>
          <Link href={path.bankingAccount}>Banking account</Link>
          <Link href={path.address}>Address</Link>
        </div>
      </div>
      <Link href={path.cart}>Cart</Link>

      <NavBarItem name="Order" image="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078" url={path.order} />

      <NavBarItem name="Wishlist" image={'https://down-vn.img.susercontent.com/file/a0ef4bd8e16e481b4253bd0eb563f784'} url={path.wishlist} />
    </div>
  );
};

export default ManageNavbar;
