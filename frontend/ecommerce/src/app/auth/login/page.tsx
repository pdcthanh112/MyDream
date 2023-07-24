'use client';
import { useState } from 'react';
import LoginPageBackground from '@assets/images/login-page-background.jpg';
import Image from 'next/image';
import { Card, Icon } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from '@components/Button';
import { GoogleLogin } from '@react-oauth/google';
import LoginFacebook from '@assets/images/facebook-login-button.png';
import {Email as EmailIcon, Lock as LockIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon} from '@mui/icons-material';
import Link from 'next/link';
import { login } from '@redux/features/authSlice';
import { LoginForm } from 'models/CustomerModel';
import { RootState, useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

export default function Login () {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const { loading } = useSelector((state: RootState) => state.auth.login);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    dispatch(login(data)).then((res) => {
      if (res.payload.status === 'SUCCESS') {
        navigate.push('/home');
      }
    });
  };

  const InputField = styled.div`
    border: 1px solid #b6b6b6;
    padding: 0.65rem 1.8rem 0.65rem 0.8rem;
    border-radius: 4px;
    margin-top: 1rem;
    position: relative;
  `;

  return (
    <div className="relative">
      <Image src={LoginPageBackground} alt={'Background'} width={1590} />

      <Card className="bg-white absolute top-14 left-32 z-10 px-10 py-5 w-[34%]">
        <h1 className="bg-green-300 text-white text-xl px-8 py-3">Welcome to CongThanh Ecommerce</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-16">
            <InputField className={formState.errors.email ? 'bg-red-100' : ''}>
              <Icon component={EmailIcon} />
              <input
                type="email"
                {...register('email', {
                  required: 'Email is require',
                })}
                placeholder="Enter your email"
                className={`focus:outline-none ml-3 w-[22rem] ${formState.errors.email ? 'bg-red-100' : ''}`}
              />
            </InputField>
            {formState.errors.email && <span className="text-red-500">{formState.errors.email.message}</span>}
          </div>
          <div className="h-16">
            <InputField className={formState.errors.password ? 'bg-red-100' : ''}>
              <Icon component={LockIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is require',
                })}
                placeholder="Enter your password"
                className={`focus:outline-none ml-3 w-[22rem] ${formState.errors.password ? 'bg-red-100' : ''}`}
              />
              <Icon
                component={showPassword ? VisibilityIcon : VisibilityOffIcon}
                fontSize="small"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 mt-1"
              />
            </InputField>
            {formState.errors.password && <span className="text-red-500">{formState.errors.password.message}</span>}
          </div>
          <div className="flex justify-end">Forget password</div>

          <div className="flex items-center">
            <input type="checkbox" />
            <span className="ml-2">Remember me</span>
          </div>
          <Button className="w-full bg-yellow-400 mt-5">Login</Button>
          <BarLoader color="#00FF00" loading={loading} width={440} />
        </form>
        <div className="relative flex justify-center mt-3">
          <div className=" w-[40%] h-0.5 bg-[#808080] mt-3"></div>
          <span className="mx-4">or</span>
          <div className=" w-[40%] h-0.5 bg-[#808080] mt-3"></div>
        </div>

        <div className="grid grid-cols-2 mt-4">
          <GoogleLogin
            text="signin_with"
            context="signin"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <Image src={LoginFacebook} alt={''} width={182} className="ml-6" />
        </div>
        <div className="flex justify-center mt-10 text-sm">
          <span>You don&apos;t have an account?</span>
          <Link href={'/auth/signup'} className="hover:text-yellow-600">
            &nbsp;Register now
          </Link>
        </div>
      </Card>
    </div>
  );
};

