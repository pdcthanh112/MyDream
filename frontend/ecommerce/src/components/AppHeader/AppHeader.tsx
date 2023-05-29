import Image from 'next/image';
import './AppHeader.module.scss';
import AppLogo from '@assets/images/app-logo-removebg.png';

export default function AppHeader() {
  return (
    <div className="flex justify-between">
      <a href="/">
        <Image
          src={AppLogo}
          alt="App Logo"
          style={{ width: '5rem', height: 'auto' }}
        />
      </a>
      <div className="auth-container">
        <a href="/login" className='text-red-600'>login</a>
      </div>
    </div>
  );
}
