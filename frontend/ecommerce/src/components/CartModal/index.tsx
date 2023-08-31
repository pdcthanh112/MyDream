import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Cart, CreateCartForm } from '@models/CartModel';
import { useRouter } from 'next/router';
import { Icon } from '@mui/material';
import { Done as DoneIcon, Clear as ClearIcon } from '@mui/icons-material';
import { Customer } from '@models/CustomerModel';
import { useAppSelector } from '@redux/store';
import { createNewCart, getCartByCustomerId } from '@apis/cartApi';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Image from 'next/image';
import DefaultImage from '@assets/images/default-image.jpg';
import CartEmptyImage from '@assets/images/cart-empty-image.png';
import Button from '@components/Button';
import { useTranslation } from 'next-i18next';

const CartModal = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const queryClient = useQueryClient();
  const [isCreateCart, setIsCreateCart] = useState(false);

  const { data: listCart, isLoading } = useQuery(['listCart'], async () => await getCartByCustomerId(currentUser.userData.accountId).then((response) => response.data));

  const { mutate: mutateCreateCart } = useMutation({
    mutationFn: async (data: CreateCartForm) => await createNewCart(data),
    onSuccess: () => {
      toast.success('Create cart successfully');
      queryClient.invalidateQueries(['listCart']);
      setIsCreateCart(false);
    },
  });

  const { register, handleSubmit } = useForm<CreateCartForm>();
  const onSubmit: SubmitHandler<CreateCartForm> = (data) => {
    mutateCreateCart(data);
  };

  let countItem = 0;

  if (!currentUser)
    return (
      <div className="text-center">
        <Image src={CartEmptyImage} alt={'Cart empty'} width={200} className="mx-auto mt-10 mb-3" />
        <div className="text-lg">{t('cart.please_signin_to_view_your_cart')}</div>
      </div>
    );

  return (
    <div className="text-base">
      <div className="flex justify-end mr-5 hover:cursor-pointer hover:underline" onClick={() => setIsCreateCart(true)}>
        {t('cart.create_new_cart')}
      </div>
      {isCreateCart && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            <div className="border border-gray-400 px-2 py-1 rounded">
              <input type="text" {...register('name', {})} defaultValue="New cart" placeholder="Enter name" className="focus:outline-none w-[12rem]" />
              <input type="hidden" {...register('customerId', {})} defaultValue={currentUser.userData.accountId} />
            </div>
            <Icon component={ClearIcon} titleAccess="Cancel" className="hover:cursor-pointer" onClick={() => setIsCreateCart(false)} />
            <button className="mb-2 hover:cursor-pointer" title="Create">
              <Icon component={DoneIcon} />
            </button>
          </div>
        </form>
      )}

      {listCart?.map((cart: Cart) => (
        <div key={cart.id} className="border-b-2 border-b-gray-200">
          <h4 className="pl-2 font-medium text-lg">{cart.name}</h4>
          {cart.cartItems?.length > 0 ? (
            <>
              {cart.cartItems.map((item) => {
                countItem += 1;
                return (
                  <div
                    key={item.id}
                    className="flex justify-between px-5 py-2 hover:bg-gray-100 hover:cursor-pointer"
                    title={item.product.name}
                    onClick={() => router.push(`product/${item.product.id}`)}>
                    <span className="flex items-center">
                      <Image src={item.product.image || DefaultImage} alt="" width={40} className="border border-gray-300" />
                      <h4 className="truncate ml-2 w-56">{item.product.name}</h4>
                    </span>
                    <span className="text-yellow-500">${item.product.price}</span>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex justify-center">{t('cart.this_cart_have_no_item')}</div>
          )}
        </div>
      ))}

      <div className="flex justify-between mx-3 my-3">
        <span>{countItem} item(s)</span>
        <Button className="bg-yellow-400" onClick={() => router.push('/cart')}>
          {t('cart.view_cart')}
        </Button>
      </div>
    </div>
  );
};

export default CartModal;
