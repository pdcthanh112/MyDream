'use client';
import React, { useState, ReactNode, ReactElement } from 'react';
import type { NextPageWithLayout } from 'app/page';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignupForm } from 'models/CustomerModel';
import { Autocomplete, TextField, Icon, Card } from '@mui/material';
import { genderData } from '@utils/constants/dropdownData';
import Button from '@components/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import RootLayout from 'app/layout';

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

const Signup: NextPageWithLayout = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, setValue, watch, handleSubmit, formState } = useForm<SignupForm>();
  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    // dispatch(login(data)).then((res) => {
    //   if (res.payload.status === 'SUCCESS') {
    //     navigate.push('/home');
    //   }
    // });
    console.log('RRRRRRRRRRRRRRRRRRRR', data);
  };

  const InputField = styled.div`
    border: 1px solid #b6b6b6;
    padding: 0.45rem 1.8rem 0.45rem 0.6rem;
    border-radius: 4px;
    position: relative;
  `;

  return (
    <Card className="flex items-center justify-center h-[85vh] w-screen bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className=" bg-white h-[80%] w-[52%] px-8 py-3">
        <h1 className="flex justify-center text-2xl font-semibold">Register</h1>
        <div className="flex justify-end">
          <span>You already have account?&nbsp;</span>
          <Link href="/auth/login" className="hover:text-yellow-600 hover:cursor-pointer hover:underline">
            Login
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-10">
            <InputComponent title="Email" error={formState.errors.email?.message}>
              <InputField>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is require',
                  })}
                  placeholder="Enter your email"
                  className={`focus:outline-none ml-3 w-[100%] ${formState.errors.email ? 'bg-red-100' : ''}`}
                />
              </InputField>
            </InputComponent>

            <InputComponent title="Name" error={formState.errors.name?.message}>
              <InputField>
                <input
                  type="text"
                  {...register('name', {
                    required: 'Name is require',
                  })}
                  placeholder="Enter your fullname"
                  className={`focus:outline-none ml-3 w-[100%] ${formState.errors.name ? 'bg-red-100' : ''}`}
                />
              </InputField>
            </InputComponent>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <InputComponent title="Password" error={formState.errors.password?.message}>
              <InputField>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is require',
                    minLength: { value: 8, message: 'Password must be 8 - 32 digit' },
                    maxLength: { value: 32, message: 'Password must be 8 - 32 digit' },
                  })}
                  placeholder="Enter your password"
                  className={`focus:outline-none ml-3 w-[100%] ${formState.errors.password ? 'bg-red-100' : ''}`}
                />
                <Icon
                  component={showPassword ? VisibilityIcon : VisibilityOffIcon}
                  fontSize="small"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 right-3"
                />
              </InputField>
            </InputComponent>

            <InputComponent title="Confirm" error={formState.errors.confirm?.message}>
              <InputField>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('confirm', {
                    required: 'Confirm password is require',
                    validate: (value) => value === watch('password') || 'Confirm do not match',
                  })}
                  placeholder="Enter your confirm"
                  className={`focus:outline-none ml-3 w-[100%] ${formState.errors.confirm ? 'bg-red-100' : ''}`}
                />
                <Icon
                  component={showPassword ? VisibilityIcon : VisibilityOffIcon}
                  fontSize="small"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 right-3"
                />
              </InputField>
            </InputComponent>
          </div>

          <div className="grid grid-cols-11 gap-10">
            <InputComponent title="Phone" className="col-span-4" error={formState.errors.phone?.message}>
              <InputField>
                <input
                  type="text"
                  {...register('phone', {
                    required: 'Phone is require',
                  })}
                  placeholder="Enter your phone number"
                  className={`focus:outline-none ml-3 w-[100%] ${formState.errors.phone ? 'bg-red-100' : ''}`}
                />
              </InputField>
            </InputComponent>

            <InputComponent title="Gender" className="col-span-3" error={formState.errors.gender?.message}>
              {/* <InputField> */}
              <Autocomplete
                options={genderData()}
                size={'small'}
                // sx={{ width: 220, marginRight: 2 }}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="Gender" />}
                onInputChange={(event, value) => {
                  setValue('gender', value);
                }}
                // {...register('gender')}
              />
              {/* </InputField> */}
            </InputComponent>
            <InputComponent title="Date of birth" className="col-span-4" error={formState.errors.gender?.message}>
              <InputField>
                <input
                  type="date"
                  {...register('dob')}
                  // placeholder="Enter your phone number"
                  className={`focus:outline-none ml-3 w-[100%] ${formState.errors.dob ? 'bg-red-100' : ''}`}
                />
              </InputField>
            </InputComponent>
          </div>
          <InputComponent title="Address" error={formState.errors.address?.message}>
            <InputField>
              <input
                type="text"
                {...register('address', {
                  required: 'Name is require',
                })}
                placeholder="Enter your address"
                className={`focus:outline-none ml-3 w-[100%] ${formState.errors.address ? 'bg-red-100' : ''}`}
              />
            </InputField>
          </InputComponent>

          <div className="flex justify-center">
            <Button className="bg-yellow-300 rounded-lg w-[40%]">Register</Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

Signup.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Signup;
