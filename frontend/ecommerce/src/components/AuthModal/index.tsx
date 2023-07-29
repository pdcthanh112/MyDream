'use client'
import { useState, ReactNode } from 'react';
import './style.scss';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Modal, Box, Icon } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginForm, SignupForm } from '@models/CustomerModel';
import { useAppDispatch } from '@redux/store';
import { login } from '@redux/features/authSlice';
import {Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Close as CloseIcon} from '@mui/icons-material';
import Button from '@components/Button';
import AppLogo from '@assets/images/app-logo.png';

interface InputComponentProps {
  title: string;
  children: ReactNode;
  error?: any;
  className?: string;
}

const InputComponent: React.FC<InputComponentProps> = (element) => {
  return (
    <div className={`mb-3 h-20 ${element.className}`}>
      <h5 className="font-medium">{element.title}</h5>
      <div className={`${element.error ? 'bg-red-100' : ''}`}>{element.children}</div>
      <span className="text-red-500">{element.error}</span>
    </div>
  );
};

const InputField = styled.div`
  border: 1px solid #b6b6b6;
  padding: 0.45rem 1.8rem 0.45rem 0.6rem;
  border-radius: 4px;
  position: relative;
`;

export default function AuthModal() {
  const dispatch = useAppDispatch();

  const [openAuthModal, setOpenAuthModal] = useState(true);
  const [activeTab, setActiveTab] = useState('login');

  const [showPassword, setShowPassword] = useState(false);

  const formLogin = useForm<LoginForm>();
  const formSignup = useForm<SignupForm>();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const styleAuthModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#f1f2f6',
    boxShadow: 24,
  };

  const onLogin: SubmitHandler<LoginForm> = (data) => {
    dispatch(login(data)).then((res) => {
      if (res.payload.status === 'SUCCESS') {
        setOpenAuthModal(false);
      }
    });
  };
  const onSignup: SubmitHandler<SignupForm> = (data) => {
    // dispatch(login(data)).then((res) => {
    //   if (res.payload.status === 'SUCCESS') {
    //     navigate.push('/home');
    //   }
    // });
    console.log('RRRRRRRRRRRRRRRRRRRR', data);
  };

  return (
    <Modal open={openAuthModal} onClose={() => setOpenAuthModal(false)}>
      <Box sx={styleAuthModal}>
        <div className="modal-auth-container">
          <input type="radio" className="tabs__radio" name="auth-tabs" id="tab1" checked={activeTab === 'login'} onChange={() => handleTabChange('login')} />
          <label htmlFor="tab1" className="tabs__label">
            Login
          </label>
          <div className="tabs__content">
            <Image src={AppLogo} alt="" />
            <form onSubmit={formLogin.handleSubmit(onLogin)}>
              <InputComponent title="Email" error={formLogin.formState.errors.email?.message}>
                <InputField>
                  <input
                    type="email"
                    {...formLogin.register('email', {
                      required: 'Email is require',
                    })}
                    placeholder="Enter your email"
                    className={`focus:outline-none ml-3 w-[100%] ${formLogin.formState.errors.email ? 'bg-red-100' : ''}`}
                  />
                </InputField>
              </InputComponent>

              <InputComponent title="Password" error={formLogin.formState.errors.password?.message}>
                <InputField>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...formLogin.register('password', {
                      required: 'Password is require',
                    })}
                    placeholder="Enter your password"
                    className={`focus:outline-none ml-3 w-[100%] ${formLogin.formState.errors.password ? 'bg-red-100' : ''}`}
                  />
                  <Icon
                    component={showPassword ? VisibilityIcon : VisibilityOffIcon}
                    fontSize="small"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2 right-3"
                  />
                </InputField>
              </InputComponent>

              {/* {loginError && <div className="input-error p-2 rounded">Tên đăng nhập hoặc mật khẩu không chính xác</div>} */}

              <Link href="/auth/forget-password" className="flex justify-end hover:underline" title="Forgot password">
                Forgot password
              </Link>

              {/* <GoogleButton onClick={() => handleGoogleSignIn()} /> */}
              <div className="mt-4">
                <Button className="bg-yellow-400 w-full text-white text-lg font-medium">Login</Button>
                {/* {isLoadingAuth && <ReactLoading className="ml-2" type="spin" color="#FF4444" width={37} />} */}
              </div>
            </form>
            <div className="my-3 font-medium">
              <span>You don&apos;t have an account </span>
              <Link href="/auth/signup" style={{ color: '#116835' }}>
                Register
              </Link>
            </div>
          </div>

          <input type="radio" className="tabs__radio" name="auth-tabs" id="tab2" checked={activeTab === 'signup'} onChange={() => handleTabChange('signup')} />
          <label htmlFor="tab2" className="tabs__label">
            Signup
          </label>
          <div className="tabs__content">
            <form onSubmit={formSignup.handleSubmit(onSignup)}>
              <InputComponent title="Email" error={formSignup.formState.errors.email?.message}>
                <InputField>
                  <input
                    type="email"
                    {...formSignup.register('email', {
                      required: 'Email is require',
                    })}
                    placeholder="Enter your email"
                    className={`focus:outline-none ml-3 w-[100%] ${formSignup.formState.errors.email ? 'bg-red-100' : ''}`}
                  />
                </InputField>
              </InputComponent>

              <InputComponent title="Name" error={formSignup.formState.errors.name?.message}>
                <InputField>
                  <input
                    type="text"
                    {...formSignup.register('name', {
                      required: 'Name is require',
                    })}
                    placeholder="Enter your fullname"
                    className={`focus:outline-none ml-3 w-[100%] ${formSignup.formState.errors.name ? 'bg-red-100' : ''}`}
                  />
                </InputField>
              </InputComponent>

              <InputComponent title="Password" error={formSignup.formState.errors.password?.message}>
                <InputField>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...formSignup.register('password', {
                      required: 'Password is require',
                      minLength: { value: 8, message: 'Password must be 8 - 32 digit' },
                      maxLength: { value: 32, message: 'Password must be 8 - 32 digit' },
                    })}
                    placeholder="Enter your password"
                    className={`focus:outline-none ml-3 w-[100%] ${formSignup.formState.errors.password ? 'bg-red-100' : ''}`}
                  />
                  <Icon
                    component={showPassword ? VisibilityIcon : VisibilityOffIcon}
                    fontSize="small"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2 right-3"
                  />
                </InputField>
              </InputComponent>

              <InputComponent title="Confirm" error={formSignup.formState.errors.confirm?.message}>
                <InputField>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...formSignup.register('confirm', {
                      required: 'Confirm password is require',
                      validate: (value) => value === formSignup.watch('password') || 'Confirm do not match',
                    })}
                    placeholder="Enter your confirm"
                    className={`focus:outline-none ml-3 w-[100%] ${formSignup.formState.errors.confirm ? 'bg-red-100' : ''}`}
                  />
                  <Icon
                    component={showPassword ? VisibilityIcon : VisibilityOffIcon}
                    fontSize="small"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2 right-3"
                  />
                </InputField>
              </InputComponent>

              <Button className="bg-yellow-400 w-full text-white text-lg font-medium">Signup</Button>
              {/* {isLoadingAuth && <ReactLoading className="ml-2" type="spin" color="#FF4444" width={37} />} */}
            </form>
            <div className="my-3 font-medium">
              <span>You already have account? </span>
              <Link href="/auth/login" style={{ color: '#116835' }}>
                Login
              </Link>
            </div>
          </div>

          <Icon component={CloseIcon} titleAccess="Close" className="absolute top-2 right-2 hover:cursor-pointer" onClick={() => setOpenAuthModal(false)} />
        </div>
      </Box>
    </Modal>
  );
}
