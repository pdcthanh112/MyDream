'use client';
import { NextPage } from 'next';
import { useState } from 'react';
import LoginPageBackground from '@assets/images/login-page-background.jpg';
import Image from 'next/image';
import { Card, Icon } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from '@components/Button';
import { Email as EmailIcon, Lock as LockIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { LoginForm } from '@models/CustomerModel';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { loginRequested } from '@redux/actions/auth';
import { getProviders, signIn } from 'next-auth/react';
import { getAuthLogo } from '@utils/helper';

const InputField = styled.div`
  border: 1px solid #b6b6b6;
  padding: 0.65rem 1.8rem 0.65rem 0.8rem;
  border-radius: 4px;
  margin-top: 1rem;
  position: relative;
`;

const Login: NextPage = ({ providers }: any): React.ReactElement => {
  console.log('TTTTTTTTTTTTTTTTTTTTTTTTT', providers);
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const status = useAppSelector((state) => state.auth.status);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    dispatch(loginRequested({ email: data.email, password: data.password }));
  };

  return (
    <div className="relative">
      <Image src={LoginPageBackground} alt={'Background'} width={1590} />

      <Card className="bg-white absolute top-14 left-32 z-10 px-10 py-5 w-[36%]">
        <h1 className="bg-green-300 text-white text-xl px-8 py-3">Welcome to CongThanh Ecommerce</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-16">
            <InputField className={formState.errors.email && 'bg-red-100'}>
              <Icon component={EmailIcon} />
              <input
                type="email"
                {...register('email', {
                  required: 'Email is require',
                })}
                placeholder="Enter your email"
                className={`focus:outline-none ml-3 w-[22rem] ${formState.errors.email && 'bg-red-100'}`}
              />
            </InputField>
            {formState.errors.email && <span className="text-red-500">{formState.errors.email.message}</span>}
          </div>
          <div className="h-16">
            <InputField className={formState.errors.password && 'bg-red-100'}>
              <Icon component={LockIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is require',
                })}
                placeholder="Enter your password"
                className={`focus:outline-none ml-3 w-[22rem] ${formState.errors.password && 'bg-red-100'}`}
              />
              <Icon
                component={showPassword ? Visibility : VisibilityOff}
                titleAccess={showPassword ? t('common.hide_password') : t('common.show_password')}
                fontSize="small"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 mt-1 hover:cursor-pointer"
              />
            </InputField>
            {formState.errors.password && <span className="text-red-500">{formState.errors.password.message}</span>}
          </div>
          <div className="flex justify-end">{t('login.forgot_password')}</div>

          <div className="flex items-center">
            <input type="checkbox" />
            <span className="ml-2">{t('login.remember_me')}</span>
          </div>
          <Button className="w-full bg-yellow-400 mt-5">{t('common.login')}</Button>
        </form>
        <div className="relative flex justify-center mt-3">
          <div className=" w-[40%] h-0.5 bg-[#808080] mt-3"></div>
          <span className="mx-4">{t('common.or')}</span>
          <div className=" w-[40%] h-0.5 bg-[#808080] mt-3"></div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-2">
          {Object.values(providers).map((provider: any) => (
            <button
              key={provider.id}
              className={`flex items-center rounded-md text-white col-span-6 w-full bg-[${getAuthLogo(provider.id)?.bgColor}]`}
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              <span className={`border-r-2 border-r-slate-200 p-2 rounded-l-lg bg-[${getAuthLogo(provider.id).iconBg}]`}>
                <Image src={getAuthLogo(provider.id)?.img} alt="" width={28}></Image>
              </span>
              <span className='ml-2'>Sign in with {provider.name}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-10 text-sm">
          <span>{t('login.you_dont_have_an_account')}</span>
          <Link href={'/auth/signup'} className="hover:text-yellow-600">
            &nbsp;{t('login.register_now')}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;

// export async function getServerSideProps(context: any) {

//   return {
//     props: {
//       ...(await serverSideTranslations(context.locale, ['common'])),
//     },
//   };
// }
export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  const translations = await serverSideTranslations(context.locale, ['common']);

  return {
    props: {
      providers,
      ...translations,
    },
  };
}
