import { NextPage } from 'next';
import { useState } from 'react';
import LoginPageBackground from '@assets/images/login-page-background.jpg';
import Image from 'next/image';
import { Card, Icon } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from '@components/Button';
import LoginFacebook from '@assets/images/facebook-login-button.png';
import { Email as EmailIcon, Lock as LockIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
// import { login } from '@redux/features/authSlice';
import { LoginForm } from '@models/CustomerModel';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { BarLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const InputField = styled.div`
  border: 1px solid #b6b6b6;
  padding: 0.65rem 1.8rem 0.65rem 0.8rem;
  border-radius: 4px;
  margin-top: 1rem;
  position: relative;
`;

const Login: NextPage = (): React.ReactElement => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { pending } = useAppSelector((state) => state.auth?.login);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    dispatch({ type: 'auth/login', payload: data });
    // dispatch(login(data)).then((res) => {
    //   if (res.payload.status === 'SUCCESS') {
    //     router.push('/home');
    //   }
    // });
  };

  return (
    <div className="relative">
      <Image src={LoginPageBackground} alt={'Background'} width={1590} />

      <Card className="bg-white absolute top-14 left-32 z-10 px-10 py-5 w-[34%]">
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
          <BarLoader color="#00FF00" loading={pending} width={440} />
        </form>
        <div className="relative flex justify-center mt-3">
          <div className=" w-[40%] h-0.5 bg-[#808080] mt-3"></div>
          <span className="mx-4">{t('common.or')}</span>
          <div className=" w-[40%] h-0.5 bg-[#808080] mt-3"></div>
        </div>

        {/* <div className="grid grid-cols-2 mt-4">
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
        </div> */}
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

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}
