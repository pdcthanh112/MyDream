import Image from 'next/image';
import './AppHeader.module.scss';
import AppLogo from '@assets/images/app-logo-removebg.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
// import signIn from 'next-auth'   
// import {signIn, signOut, useSession} from 'next-auth'    2:01:33

export default function AppHeader() {
  const router = useRouter()
  return (
    <header>
      <div className="flex items-center bg-slate-400 p-1 flex-grow py-2">
        
          <Image
            src={AppLogo}
            alt="App Logo"
            style={{ width: '5rem', height: 'auto' }}
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
        

        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="!w-16 !h-16 p-4" />
        </div>

        <div 
        // onClick={() => signIn}
         className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="cursor-pointer hover:underline">
            <p>Hello, CongThanh</p>
            <p className="font-extrabold md:text-sm">Account & Infor</p>
          </div>
          <div className="cursor-pointer hover:underline flex items-center" onClick={() => router.push("/checkout")}>
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>4</span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm">Cart</p>
          </div>
        </div>
      </div>
    </header>
  );
}
