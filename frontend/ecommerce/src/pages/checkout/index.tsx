import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getCartByCustomerId } from '@apis/cartApi';
import { useAppSelector } from '@redux/store';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CheckoutForm } from 'models/CheckoutModel';
import Button from '@components/Button';
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { paymentMethod } from '@utils/constants/dropdownData';
import Image from 'next/image';
import PaymentCOD from '@assets/icons/payment-cod.png';
import PaymentVISA from '@assets/icons/payment-visa.png';
import PaymentMasterCard from '@assets/icons/payment-mastercard.png';
import PaymentAmex from '@assets/icons/payment-amex.png';
import PaymentJCB from '@assets/icons/payment-jcb.png';
import PaymentPaypal from '@assets/icons/payment-paypal.png';
import PaymentMomo from '@assets/icons/payment-momo.png';

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

export default function Checkout() {
  const currentUser = useAppSelector((state) => state.auth.login.currentUser);

  const router = useRouter();

  const [pickPaymentMethod, setPickPaymentMethod] = useState('COD');

  const { data: cart, isLoading } = useQuery(['cart'], async () => await getCartByCustomerId(currentUser.userData.accountId).then((response) => response.data));

  const { register, setValue, watch, handleSubmit, formState } = useForm<CheckoutForm>();
  const onSubmit: SubmitHandler<CheckoutForm> = (data) => {
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

  const cardTypeOptions = [
    {
      label: (
        <div className="flex items-center">
          <span>COD&nbsp;</span>
          <span className="hidden md:flex">
            <Image src={PaymentCOD} alt={''} width={33} />
          </span>
        </div>
      ),
      value: 'value1',
    },
    {
      label: (
        <div className="flex items-center">
          <span>COD&nbsp;</span>
          <span className="hidden md:flex">
            <Image src={PaymentCOD} alt={''} width={33} />
          </span>
        </div>
      ),
      value: 'value1',
    },
    {
      label: (
        <div className="flex items-center">
          <span>COD&nbsp;</span>
          <span className="hidden md:flex">
            <Image src={PaymentCOD} alt={''} width={33} />
          </span>
        </div>
      ),
      value: 'value1',
    },
  ];

  return (
    <div className="bg-white w-full ">
      <div className="w-[80%] mx-auto mt-5 flex justify-between">
        <div className="border border-gray-400 rounded-md w-[70%] px-4 py-5">
          <h4 className="font-medium text-xl my-3">Checkout information</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputComponent title="Country/Region" className="col-span-3" error={formState.errors.paymentMethod?.message}>
              <Autocomplete
                options={['Vietnam']}
                size={'small'}
                renderInput={(params) => <TextField {...params} label="" />}
                onInputChange={(event, value) => {
                  setValue('paymentMethod', value);
                }}
              />
            </InputComponent>
            <InputComponent title="City" className="col-span-3" error={formState.errors.paymentMethod?.message}>
              <Autocomplete
                options={['Ho Chi Minh']}
                size={'small'}
                renderInput={(params) => <TextField {...params} label="" />}
                onInputChange={(event, value) => {
                  setValue('paymentMethod', value);
                }}
              />
            </InputComponent>

            <InputComponent title="Address" error={formState.errors.address?.message}>
              <InputField>
                <input
                  type="text"
                  {...register('address', {
                    required: 'Address is require',
                  })}
                  placeholder="Enter your address"
                  className={`focus:outline-none ml-3 w-[100%] ${formState.errors.address ? 'bg-red-100' : ''}`}
                />
              </InputField>
            </InputComponent>

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

              <InputComponent title="Zip Code/Postal" error={formState.errors.address?.message} className="w-40">
                <InputField>
                  <input
                    type="text"
                    {...register('address', {
                      required: 'Address is require',
                    })}
                    placeholder="Enter zip code"
                    className={`focus:outline-none ml-3 w-[100%] ${formState.errors.address ? 'bg-red-100' : ''}`}
                  />
                </InputField>
              </InputComponent>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <FormControl className="col-span-5">
                <FormLabel id="demo-radio-buttons-group-label">Payment method</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="COD" name="radio-buttons-group">
                  <FormControlLabel
                    value="COD"
                    control={<Radio />}
                    label={
                      <div className="flex items-center">
                        <span>COD&nbsp;</span>
                        <span className="hidden md:flex">
                          <Image src={PaymentCOD} alt={''} width={33} />
                        </span>
                      </div>
                    }
                    onClick={() => setPickPaymentMethod('COD')}
                  />
                  <FormControlLabel
                    value="Credit card"
                    control={<Radio />}
                    label={
                      <div className="flex items-center">
                        <span>Credit card&nbsp;</span>
                        <span className="hidden md:flex gap-2">
                          <Image src={PaymentVISA} alt={''} width={35} />
                          <Image src={PaymentMasterCard} alt={''} width={35} />
                          <Image src={PaymentAmex} alt={''} width={35} />
                          <Image src={PaymentJCB} alt={''} width={35} />
                        </span>
                      </div>
                    }
                    onClick={() => setPickPaymentMethod('Credit card')}
                  />
                  <FormControlLabel
                    value="Debit card"
                    control={<Radio />}
                    label={
                      <div className="flex items-center">
                        <span>Debit card&nbsp;</span>
                        <span className="hidden md:flex gap-2">
                          <Image src={PaymentVISA} alt={''} width={35} />
                          <Image src={PaymentMasterCard} alt={''} width={35} />
                          <Image src={PaymentAmex} alt={''} width={35} />
                          <Image src={PaymentJCB} alt={''} width={35} />
                        </span>
                      </div>
                    }
                    onClick={() => setPickPaymentMethod('Debit card')}
                  />
                  <FormControlLabel
                    value="Paypal"
                    control={<Radio />}
                    label={
                      <div className="flex items-center">
                        <span>PayPal&nbsp;</span>
                        <span className="hidden md:flex">
                          <Image src={PaymentPaypal} alt={''} width={55} />
                        </span>
                      </div>
                    }
                    onClick={() => setPickPaymentMethod('Paypal')}
                  />
                  <FormControlLabel
                    value="Momo"
                    control={<Radio />}
                    label={
                      <div className="flex items-center">
                        <span>Momo&nbsp;</span>
                        <span className="hidden md:flex">
                          <Image src={PaymentMomo} alt={''} width={25} />
                        </span>
                      </div>
                    }
                    onClick={() => setPickPaymentMethod('Momo')}
                  />
                </RadioGroup>
              </FormControl>

              {pickPaymentMethod !== 'COD' && (
                <div className="col-span-7">
                  <InputComponent title="Select card type" className="col-span-4" error={formState.errors.paymentMethod?.message}>
                    <Autocomplete
                      options={[
                        <div key={2} className="flex items-center">
                          <span>COD Cash on Dilivery&nbsp;</span>
                          <span className="hidden md:flex">
                            <Image src={PaymentCOD} alt={''} width={33} />
                          </span>
                        </div>,
                      ]}
                      // options={cardType()}
                      size={'small'}
                      renderInput={(params) => <TextField {...params} label="" />}
                      onInputChange={(event, value) => {
                        setValue('paymentMethod', value);
                      }}
                    />
                  </InputComponent>
                  <InputComponent title="Payment method" className="col-span-4" error={formState.errors.paymentMethod?.message}>
                    <Autocomplete
                      options={cardTypeOptions}
                      getOptionLabel={(option) => option.value}
                      renderOption={(option) => option}
                
                      size={'small'}
                      renderInput={(params) => <TextField {...params} label="Payment method" />}
                      onInputChange={(event, value) => {
                        setValue('paymentMethod', value);
                      }}
                    />
                  </InputComponent>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button className="bg-yellow-300 rounded-lg w-[40%]">Checkout</Button>
            </div>
          </form>
        </div>
        <div className="border border-gray-400 rounded-md w-[28%]">afdal;j</div>
      </div>
    </div>
  );
}
