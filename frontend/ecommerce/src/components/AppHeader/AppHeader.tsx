import React from 'react';
import './AppHeader.scss';
import Image from 'next/image';
import AppLogo from '@assets/images/app-logo-removebg.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { Card } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Button from '@components/Button';
import { logout } from '@redux/features/authSlice';
// import signIn from 'next-auth'
// import {signIn, signOut, useSession} from 'next-auth'    2:01:33

export default function AppHeader() {
  const currentUser = useAppSelector((state) => state.auth.login.currentUser);
  const appData = useAppSelector((state) => state.appData);

  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <>
      <header>
        <div className="flex items-center bg-slate-400 p-1 flex-grow py-2">
          <Image src={AppLogo} alt="App Logo" width={100} className="cursor-pointer" onClick={() => router.push('/')} />

          <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer ">
            <span className="bg-gray-300 h-[2.5rem] w-16 rounded-l-md flex justify-center items-center relative group">
              <span className="">
                All
                <ArrowDropDownOutlinedIcon />
              </span>

              <Card className="text-[#a4a4a4] text-sm hidden absolute transform translate-x-[36%] translate-y-[56%] py-2 w-[15rem] group-hover:block group-hover:z-50 max-h-96 group-hover:overflow-y-scroll">
                {appData.category?.map((item: any) => (
                  <div key={item.id} className='leading-6 px-2 hover:bg-gray-100'>{item.name}</div>
                ))}
              </Card>
            </span>
            <input className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4" type="text" />
            <SearchIcon className="!w-14 !h-10 p-1 bg-yellow-400 hover:bg-yellow-500" />
          </div>

          <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
            <div className="relative inline-block group">
              <div className="hover:cursor-pointer">
                {currentUser ? <>Hello, Thanh</> : <>Welcome</>}
                <p className="font-extrabold md:text-sm">{currentUser ? <>Account & Infor</> : <span onClick={() => router.push('/auth/login')}>Signin</span>}</p>
              </div>
              <Card className="text-[#a4a4a4] text-sm hidden absolute transform -translate-x-2/3 p-4 w-[30rem] group-hover:block group-hover:z-50">
                {currentUser ? (
                  <>
                    <div className="flex justify-between bg-sky-100 px-8 py-3 rounded-md">
                      <span>Who&apos;s shopping? Select profile</span>
                      <span>Manage Profile</span>
                    </div>
                    <div className="flex">
                      <div className="w-1/2">
                        <h3 className="font-semibold text-base">Your shopping</h3>
                        <ul className="leading-6">
                          <li>Create new cart</li>
                          <li>View your cart</li>
                          <li>Checkout</li>
                        </ul>
                      </div>
                      <div className="w-1/2 border-l-2 border-l-gray-100 pl-4">
                        <h3 className="font-semibold text-base">Your account</h3>
                        <ul className="leading-6">
                          <li>Account</li>
                          <li>Orders</li>
                          <li>Recommendations</li>
                          <li>Browsing History</li>
                          <li>Watchlist</li>
                        </ul>
                        <Button className="bg-yellow-400 w-52 rounded-xl" onClick={() => dispatch(logout())}>
                          Logout
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>Chua login</>
                )}
              </Card>
            </div>

            <div className="cursor-pointer hover:underline flex items-center" onClick={() => router.push('/checkout')}>
              <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">4</span>
              <ShoppingCartIcon className="h-10" />
              <p className="hidden md:inline font-extrabold md:text-sm">Cart</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
