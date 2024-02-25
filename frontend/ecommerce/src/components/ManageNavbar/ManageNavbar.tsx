import React from 'react';
import { Customer } from '@models/type';
import { useAppSelector } from '@redux/store';
import Image from 'next/image';
import DefaultImage from '@assets/images/default-image.jpg';
import Link from 'next/link';
import path from '@config/path';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Card } from '@mui/material';

type NavBarItemProps = {
  name: string;
  image: string;
  url: string;
  className?: string;
};

const ManageNavbar = () => {
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const router = useRouter();
  const { pathname } = router;
  const { t } = useTranslation('common');

  const NavBarItem = ({ name, image, url, className }: NavBarItemProps) => (
    // <Card className={`px-3 py-4 rounded mb-2 hover:bg-blue-200  ${pathname === url && 'bg-blue-200'} ${className}`} sx={{backgroundColor: pathname === url ? '#4d4dff' : '#fff'}}>
      <Link href={url} className={`flex px-3 py-4 rounded mb-2 hover:bg-blue-200  ${pathname === url && 'bg-blue-200'} ${className}`}>
        <Image src={image} alt={name} width={20} height={20} />
        <span className="ml-1">{name}</span>
      </Link>
    // </Card>
  );

  return (
    <div className="px-3 py-2 flex flex-col">
      <div className="flex border-b-2 border-gray-300 pb-2 mb-3">
        <div className="rounded-full">
          <Image src={currentUser.userInfo.image || DefaultImage} alt={currentUser.userInfo.name} width={40} height={40} className="rounded-full" />
        </div>
        {/* <Avatar src={currentUser.userInfo.image || String(DefaultImage)} /> */}
        <span className="font-semibold flex items-center ml-3">{currentUser.userInfo.name}</span>
      </div>
      <div className="flex flex-col">
        <NavBarItem name={t('manage.profile')} image="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4" url={path.profile} />

        <div className="ml-3 flex flex-col">
          <NavBarItem name={'Change password'} image={''} url={path.changePassword} />
          <NavBarItem name={'Banking account'} image={''} url={path.bankingAccount} />
          <NavBarItem name={'Address'} image={''} url={path.address} />
        </div>
      </div>
      <NavBarItem name={'Cart'} image={''} url={path.cart} />

      <NavBarItem name="Order" image="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078" url={path.order} />

      <NavBarItem name="Wishlist" image={'https://down-vn.img.susercontent.com/file/a0ef4bd8e16e481b4253bd0eb563f784'} url={path.wishlist} />
    </div>
  );
};

export default ManageNavbar;
