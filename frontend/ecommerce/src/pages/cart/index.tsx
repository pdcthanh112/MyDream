'use client';
import { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import { getCartByCustomerId } from '@apis/cartApi';
import { Cart } from '@models/CartModel';
import { CartItem as ICartItem } from '@models/CartItemModel';
import CartItem from './CartItem';
import { Card } from '@mui/material';
import Button from '@components/Button';
import { Customer } from '@models/CustomerModel';
import { useAppSelector } from '@redux/store';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Cart: NextPage = (): React.ReactElement => {
  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);
  const router = useRouter();
  const { t } = useTranslation('common');

  const { data: listCart, isLoading } = useQuery(['listCart'], async () => await getCartByCustomerId(currentUser.userData.accountId).then((response) => response.data));

  return (
    <div className="w-full">
      <h3 className="px-5 py-2 mb-3 text-3xl bg-white">{t('cart.your_cart')}</h3>
      <div className="flex flex-col w-[90%] mx-auto">
        {listCart?.map((cart: Cart) => {
          let countItem: number = 0;
          let sumPrice: number = 0;
          return (
            <div key={cart.id} className="md:flex mb-5 ">
              <Card className="md:w-[80%] min-h-[10vh] px-4 py-5">
                <div className="font-medium text-lg">{cart.name}</div>
                {cart.cartItems?.length > 0 ? (
                  <>
                    {cart.cartItems?.map((item: ICartItem) => {
                      countItem++;
                      sumPrice += item.product.price * item.quantity;
                      return <CartItem key={item.id} item={item} />;
                    })}
                  </>
                ) : (
                  <div className="flex justify-center">{t('cart.this_cart_have_no_item')}</div>
                )}
              </Card>
              <Card className="md:w-[20%] ml-4 p-4 relative">
                <h1 className="font-semibold text-xl">{t('common.checkout')}</h1>
                {cart.cartItems?.length > 0 && (
                  <>
                    <div className="px-3">
                      <div className="flex justify-between">
                        <span>Items({countItem}):</span>
                        <span>{sumPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        {t('common.shipping')}: <span>{t('common.free')}</span>
                      </div>
                    </div>
                    <div className="flex justify-between px-3 absolute bottom-16 border-t-2 border-t-gray-400 w-[85%]">
                      <span>{t('cart.subtotal')}:</span>
                      <span>{sumPrice.toFixed(2)}</span>
                    </div>
                    <Button className="absolute bottom-4 w-[88%] bg-yellow-400" onClick={() => router.push(`/checkout/${cart.id}`)}>
                      {t('common.checkout')}
                    </Button>
                  </>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}