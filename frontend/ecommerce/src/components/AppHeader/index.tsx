import { useState } from 'react';
import './AppHeader.scss';
import Image from 'next/image';
import { Card, Avatar, Icon } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Button from '@components/Button';
// import { logout } from '@redux/features/authSlice';
import { Customer } from '@models/CustomerModel';
// import signIn from 'next-auth'
// import {signIn, signOut, useSession} from 'next-auth'    2:01:33
import AppLogo from '@assets/images/app-logo-removebg.png';
import DefaultImage from '@assets/images/default-image.jpg';
import { Search as SearchIcon, ArrowDropDownOutlined as ArrowDropDownOutlinedIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import CartModal from '@components/CartModal';
import LanguageSwitcher from '@components/LanguageSwitcher';
import NotificationModal from '@components/NotificationModal';
import { NotificationIcon, ShoppingCartIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';
import { Category } from '@models/CategoryModel';

const AppHeader = () => {
  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);
  const appCategory: Category[] = useAppSelector((state) => state.category.data);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation('common');

  const [showNotification, setShowNotification] = useState<boolean>(false);

  return (

      <div className="flex items-center bg-slate-400 p-1 flex-grow py-2">
        <Image src={AppLogo} alt="App Logo" width={100} className="cursor-pointer mx-12" onClick={() => router.push('/')} />

        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer">
          <span className="bg-gray-300 h-[2.5rem] w-16 rounded-l-md flex justify-center items-center relative group">
            <span>
              {t('common.all')}
              <ArrowDropDownOutlinedIcon />
            </span>

            <Card className="text-[#a4a4a4] text-sm hidden absolute transform translate-x-[36%] translate-y-[56%] py-2 w-[15rem] group-hover:block group-hover:z-50 max-h-96 group-hover:overflow-y-scroll">
              {appCategory?.map((item: any) => (
                <div key={item.id} className="leading-6 px-2 hover:bg-gray-100">
                  {item.name}
                </div>
              ))}
            </Card>
          </span>
          <input className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4" />
          <SearchIcon className="!w-14 !h-10 p-1 bg-yellow-400 hover:bg-yellow-500 rounded-r-md" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <LanguageSwitcher />

          <div className="flex items-start justify-center relative group">
            <ShoppingCartIcon width={32} height={'32'} onClick={() => router.push('/cart')} className="hover:cursor-pointer" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-3">{t('common.cart')}</p>
            <span className="absolute -top-1 right-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">4</span>

            <Card className="text-[#a4a4a4] text-sm hidden absolute top-8 right-0 py-2 w-[25rem] h-[30rem] group-hover:block group-hover:z-50 max-h-96 group-hover:overflow-y-scroll">
              <CartModal />
            </Card>
          </div>

          <div className="flex items-start justify-center relative">
            <NotificationIcon width={33} height={33} className="hover:cursor-pointer" onClick={() => setShowNotification(!showNotification)} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">4</span>
            {showNotification && (
              <Card className=" text-[#a4a4a4] text-sm absolute top-10 -right-32 py-2 w-[24rem] h-[40rem] overflow-y-scroll z-10">
                <NotificationModal />
              </Card>
            )}
          </div>

          <div className="relative inline-block group">
            <div className="hover:cursor-pointer">
              {currentUser ? (
                <div>
                  <div>
                    {t('common.hello')}, {currentUser.userData.name.split(' ').pop()}
                  </div>
                  <div className="font-semibold md:text-sm">{t('header.account_and_info')}</div>
                </div>
              ) : (
                <div>
                  <div>{t('common.welcome')}</div>
                  <div className="font-semibold md:text-sm" onClick={() => router.push('/auth/login')}>
                    {t('common.login')} or {t('common.signup')}
                  </div>
                </div>
              )}
            </div>
            <Card className="text-[#a4a4a4] text-sm hidden absolute transform -translate-x-3/4 p-4 w-[30rem] group-hover:block group-hover:z-50">
              {currentUser ? (
                <>
                  <div className="flex justify-between bg-sky-100 px-5 py-3 rounded-md">
                    <span className="flex items-center">
                      <Avatar src={currentUser.userData.image || String(DefaultImage)} />
                      <span className="font-medium text-lg ml-3">{currentUser.userData.name}</span>
                    </span>
                    <span className="flex items-center hover:cursor-pointer hover:underline hover:text-yellow-600" onClick={() => router.push('/manage')}>
                      {t('common.manage_profile')}
                      <Icon component={NavigateNextIcon} />
                    </span>
                  </div>
                  <div className="flex">
                    <div className="w-1/2">
                      <h3 className="font-semibold text-base">{t('header.your_shopping')}</h3>
                      <menu className="leading-6">
                        <li className="sub-item-link" onClick={() => router.push('/cart')}>
                          {t('header.view_your_cart')}
                        </li>
                        <li className="sub-item-link">{t('common.checkout')}</li>
                        <li className="sub-item-link" onClick={() => router.push('/wishlist')}>
                          {t('header.wishlist')}
                        </li>
                        <li className="sub-item-link" onClick={() => router.push('/history')}>
                          {t('header.history')}
                        </li>
                      </menu>
                    </div>
                    <div className="w-1/2 border-l-2 border-l-gray-100 pl-4">
                      <h3 className="font-semibold text-base">{t('header.your_account')}</h3>
                      <menu className="leading-6">
                        <li className="sub-item-link" onClick={() => router.push('/account')}>
                          {t('header.account')}
                        </li>
                        <li className="sub-item-link">{t('header.orders')}</li>
                        <li className="sub-item-link">{t('header.recommendations')}</li>
                        <li className="sub-item-link">{t('header.browsing_history')}</li>
                        <li className="sub-item-link">{t('header.watchlist')}</li>
                      </menu>
                      <Button
                        className="bg-yellow-400 w-52 rounded-xl"
                        //  onClick={() => dispatch(logout())}
                      >
                        {t('common.logout')}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>Chua loginnn</>
              )}
            </Card>
          </div>
        </div>
      </div>
 
  );
};

export default AppHeader;
