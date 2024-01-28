import React from 'react';
import { Customer } from '@models/type';
import { useAppSelector } from '@redux/store';
import Image from 'next/image';
import DefaultImage from '@assets/images/default-image.jpg';
import Link from 'next/link';
import path from '@config/path';
import { useTranslation } from 'next-i18next';

const ManageNavbar = () => {
  const customer: Customer = useAppSelector((state) => state.auth.currentUser);
  const { t } = useTranslation('common');

  return (
    <div className="px-3 py-2">
      <div className="flex border-b-2 border-gray-300 pb-2">
        {/* <Image src={customer.userInfo.image || DefaultImage} alt={customer.userInfo.name} width={40} height={40}/> */}
        <Image src={DefaultImage} alt={customer.userInfo.name} width={50} height={50} className="rounded-full" />
        <span className="font-semibold flex items-center ml-3">{customer.userInfo.name}</span>
      </div>
      <div>
        <Link href={path.profile}>{t('manage.profile')}</Link>
        <Link href={path.changePassword}>Change password</Link>
      </div>
      <Link href={path.profile}>Cart</Link>
      <Link href={path.profile}>Wishlist</Link>
    </div>
  );
};

export default ManageNavbar;
