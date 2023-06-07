import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCartByCustomerId } from '@apis/cartApi';
import Image from 'next/image';
import CheckoutPageImage from '@assets/images/checkout-page-image.jpg';
import { Cart } from '@model/CartModel';
import { CartItemType } from '@model/CartItemModel';
import CartItem from './CartItem';
import {Card} from '@mui/material'
import Button from '@components/Button';

export default function Checkout() {
  const { data: listCart, isLoading } = useQuery(
    ['listCart'],
    async () =>
      await getCartByCustomerId('b985c96b-5c07-4eac-ac63-db2d077a4f51').then(
        (response) => response.data
      )
  );
  console.log(listCart);

  return (
    <main className="w-[90%] mx-auto">
      {/* <Image src={CheckoutPageImage} alt="Checkout page image" width={1200} /> */}
      <div className="flex flex-col">
        <h1 className="text-3xl">Your cart</h1>
        {listCart?.map((item: Cart) => {
          let subtotal:number = 0
          return (
          <div className="md:flex mb-5 ">
            <Card className="md:w-[80%] px-4 py-2">
              {item.cartItems.map((cartItem: CartItemType) => {
                subtotal += cartItem.product.price * cartItem.quantity;
                return (
                <CartItem item={cartItem} />
                )
              })}    
            </Card>
            <Card className="md:w-[20%] ml-4 p-4 relative">
              <h1 className='font-semibold text-xl'>Checkout</h1>
              <div className='flex justify-between px-3'><span>Subtotal:</span> <span>{subtotal}</span></div>
              <Button className='absolute bottom-4 w-[88%]'>Checkout</Button>
            </Card>
          </div>
       )})}
      </div>
    </main>
  );
}
