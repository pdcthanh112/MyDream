import {useState} from 'react'
import { Card } from '@mui/material';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '@redux/store';
import { SignupForm } from '@model/CustomerModel';

const InputField = styled.div`
border: 1px solid #b6b6b6;
padding: 0.65rem 1.8rem 0.65rem 0.8rem;
border-radius: 4px;
margin-top: 1rem;
position: relative;
`;


export default function Signup() {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm<SignupForm>();
  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    // dispatch(login(data)).then((res) => {
    //   if (res.payload.status === 'SUCCESS') {
    //     navigate.push('/home');
    //   }
    // });
    console.log(data)
  };

  return (
    <Card className="flex items-center justify-center h-[85vh] w-screen bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className=" bg-white h-[70%] w-[60%]">
        <h1>Register</h1>
        <div>
          <h6>Email</h6>
          <InputField>
            <input
              type="email"
              {...register('email', {
                required: 'Email is require',
              })}
              placeholder="Enter your email"
              className={`focus:outline-none ml-3 w-[22rem] ${formState.errors.email ? 'bg-red-100' : ''}`}
            />
          </InputField>
        </div>
      </div>
    </Card>
  );
}
