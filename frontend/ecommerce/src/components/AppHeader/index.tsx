"use client"
import { useState } from 'react';
import './AppHeader.scss';
import Image from 'next/image';
import { Card, Avatar, Icon, Modal } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Button from '@components/Button';
import { logout } from '@redux/features/authSlice';
import { Customer } from 'models/CustomerModel';
// import signIn from 'next-auth'
// import {signIn, signOut, useSession} from 'next-auth'    2:01:33
import AppLogo from '@assets/images/app-logo-removebg.png';
import DefaultImage from '@assets/images/default-image.jpg';
import {Search as SearchIcon, ArrowDropDownOutlined as ArrowDropDownOutlinedIcon, NavigateNext as NavigateNextIcon} from '@mui/icons-material';
import CartModal from '@components/CartModal';
import ChangeLanguage from '@components/ChangeLanguage';
import NotificationModal from '@components/NotificationModal';
import { NotificationIcon, ShoppingCartIcon } from '@assets/icons';

export default function AppHeader() {
  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);
  const appData = useAppSelector((state) => state.appData);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [openNotification, setOpenNotification] = useState<boolean>(false)

  return (
    <header>
      <div className="flex items-center bg-slate-400 p-1 flex-grow py-2">
        <Image src={AppLogo} alt="App Logo" width={100} className="cursor-pointer mx-6" onClick={() => router.push('/')} />

        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer">
          <span className="bg-gray-300 h-[2.5rem] w-16 rounded-l-md flex justify-center items-center relative group">
            <span>
              All
              <ArrowDropDownOutlinedIcon />
            </span>

            <Card className="text-[#a4a4a4] text-sm hidden absolute transform translate-x-[36%] translate-y-[56%] py-2 w-[15rem] group-hover:block group-hover:z-50 max-h-96 group-hover:overflow-y-scroll">
              {appData.category?.map((item: any) => (
                <div key={item.id} className="leading-6 px-2 hover:bg-gray-100">
                  {item.name}
                </div>
              ))}
            </Card>
          </span>
          <input className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4"/>
          <SearchIcon className="!w-14 !h-10 p-1 bg-yellow-400 hover:bg-yellow-500 rounded-r-md" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <ChangeLanguage />

          <div className="flex items-start justify-center relative group">
            <ShoppingCartIcon width={32} height={'32'} onClick={() => router.push('/cart')} className='hover:cursor-pointer' />
            <p className="hidden md:inline font-extrabold md:text-sm mt-3">Cart</p>
            <span className="absolute -top-1 right-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">4</span>

            <Card className="text-[#a4a4a4] text-sm hidden absolute top-8 right-0 py-2 w-[25rem] h-[30rem] group-hover:block group-hover:z-50 max-h-96 group-hover:overflow-y-scroll">
              <CartModal />
            </Card>
          </div>

          <div className="flex items-start justify-center relative">
            <NotificationIcon width={33} height={33} onClick={() => { setOpenNotification(true) }} className='hover:cursor-pointer' />
            <span className="absolute top-0 right-0 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">4</span>

            <Modal open={openNotification} onClose={() => setOpenNotification(false)}>
              <Card className="text-[#a4a4a4] text-sm absolute top-14 right-10 py-2 w-[24rem] h-[40rem] overflow-y-scroll">
                <NotificationModal />
              </Card>
            </Modal>
          </div>
          {/* <div className="flex items-start justify-center relative group">
            <Image src={NotificationIcon} alt={''} width={32} onClick={() => router.push('/cart')} className='hover:cursor-pointer'/>
            <span className="absolute top-0 right-0 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">4</span>

            <Card className="text-[#a4a4a4] text-sm hidden absolute top-8 right-0 py-2 w-[25rem] h-[120rem] group-hover:block group-hover:z-50 max-h-96 group-hover:overflow-y-scroll">
              <NotificationModal />
            </Card>
          </div> */}

          <div className="relative inline-block group">
            <div className="hover:cursor-pointer">
              {currentUser ? <>Hello, Thanh</> : <>Welcome</>}
              <p className="font-extrabold md:text-sm">{currentUser ? <>Account & Infor</> : <span onClick={() => router.push('/auth/login')}>Signin</span>}</p>
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
                      Manage profiles
                      <Icon component={NavigateNextIcon} />
                    </span>
                  </div>
                  <div className="flex">
                    <div className="w-1/2">
                      <h3 className="font-semibold text-base">Your shopping</h3>
                      <menu className="leading-6">
                        <li className="sub-item-link" onClick={() => router.push('/cart')}>View your cart</li>
                        <li className="sub-item-link">Checkout</li>
                        <li className="sub-item-link" onClick={() => router.push('/wishlist')}>
                          Wishlist
                        </li>
                        <li className="sub-item-link" onClick={() => router.push('/history')}>
                          History
                        </li>
                      </menu>
                    </div>
                    <div className="w-1/2 border-l-2 border-l-gray-100 pl-4">
                      <h3 className="font-semibold text-base">Your account</h3>
                      <menu className="leading-6">
                        <li className="sub-item-link" onClick={() => router.push('/account')}>
                          Account
                        </li>
                        <li className="sub-item-link">Orders</li>
                        <li className="sub-item-link">Recommendations</li>
                        <li className="sub-item-link">Browsing History</li>
                        <li className="sub-item-link">Watchlist</li>
                      </menu>
                      <Button className="bg-yellow-400 w-52 rounded-xl" onClick={() => dispatch(logout())}>
                        Logout
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
    </header>
  );
}


