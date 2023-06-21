import React from 'react';
import { Cart } from 'models/CartModel';
import { useRouter } from 'next/router';
import { Card } from '@mui/material';

export default function Checkout() {
  const router = useRouter();
  const { data } = router.query;
  const cart: Cart = JSON.parse(data as string);

  return (
    <div className='bg-white w-full '>
      <div className='w-[80%] mx-auto flex'>
        <Card className='border border-gray-400 rounded-lg bg-yellow-300'></Card>
        <Card className='border border-gray-400 rounded-lg bg-green-300'>afdal;j</Card>
      </div>
  
    </div>
  )
}
