import { useQuery } from '@tanstack/react-query';
import { getCartByCustomerId } from '@apis/cartApi';
import Image from 'next/image';
import CheckoutPageImage from '@assets/images/checkout-page-image.jpg';
import { Cart } from 'models/CartModel';
import { CartItem as ICartItem } from 'models/CartItemModel';
import CartItem from './CartItem';
import { Card } from '@mui/material';
import Button from '@components/Button';
import { Customer } from 'models/CustomerModel';
import { useAppSelector } from '@redux/store';

export default function Checkout() {
  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);

  const { data: listCart, isLoading } = useQuery(['listCart'], async () => await getCartByCustomerId(currentUser.userData.accountId).then((response) => response.data));

  return (
    <main className="w-[90%] mx-auto">
      {/* <Image src={CheckoutPageImage} alt="Checkout page image" width={1200} /> */}
      <div className="flex flex-col">
        <h1 className="text-3xl">Your cart</h1>
        {listCart?.map((cart: Cart) => {
          let subtotal: number = 0;
          return (
            <div key={cart.id} className="md:flex mb-5 ">
              <Card className="md:w-[80%] min-h-[10vh] px-4 py-2">
                <div>{cart.name}</div>
                {cart.cartItems !== null && cart.cartItems.length > 0 ? (
                  <>
                    {cart.cartItems?.map((item: ICartItem) => {
                      subtotal += item.product.price * item.quantity;
                      return <CartItem key={item.id} item={item} />;
                    })}
                  </>
                ) : (
                  <div className="flex justify-center">This cart have no item</div>
                )}
              </Card>
              <Card className="md:w-[20%] ml-4 p-4 relative">
                <h1 className="font-semibold text-xl">Checkout</h1>
                {cart.cartItems !== null && cart.cartItems.length > 0 && (
                  <>
                    <div className="flex justify-between px-3">
                      <span>Shipping:</span> <span>Free</span>
                    </div>
                    <div className="flex justify-between px-3">
                      <span>Subtotal:</span> <span>{subtotal.toFixed(1)}</span>
                    </div>
                    <Button className="absolute bottom-4 w-[88%] bg-yellow-400">Checkout</Button>
                  </>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </main>
  );
}
