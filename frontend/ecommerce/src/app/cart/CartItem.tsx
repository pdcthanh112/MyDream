import React from 'react';
import { CartItem } from '@models/CartItemModel';
import DefaultImage from '@assets/images/default-image.jpg';
import Image from 'next/image';
import { deleteCartItem as deleteCartItemApi, updateCartItem as updateCartItemApi } from '@apis/cartItemApi';
import { useConfirm } from 'material-ui-confirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Icon } from '@mui/material'
import { Add as AddIcon, Remove as MinusIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface CartItemProps {
  item: CartItem;
}

export default function CartItem({ item }: CartItemProps): React.ReactElement {
  const router = useRouter();
  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const { mutate: updateCartItem } = useMutation({
    mutationFn: async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => await updateCartItemApi(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(['listCart']);
    },
  });

  const { mutate: deleteCartItem } = useMutation({
    mutationFn: async (cartId: string) => await deleteCartItemApi(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries(['listCart']);
    },
  });

  const handleUpdateCartItem = async (cartItemId: string, quantity: number) => {
    updateCartItem({ cartItemId, quantity });
  };

  const handleDeleteCartItem = async (itemId: string) => {
    await confirm({
      title: 'Delete item',
      description: 'Are you sure to delete this item?',
    }).then(() => {
      deleteCartItem(itemId);
    });
  };

  return (
    <div className=" items-center border border-gray-600 rounded my-2 grid grid-cols-12">
      <Image src={item.product.image || DefaultImage} alt="Product image" className='col-span-1' width={100} />

      <div className="ml-3 hover:cursor-pointer col-span-6" onClick={() => router.push(`/product/${item.product.id}`)}>{item.product.name}</div>

      <div className="flex items-center col-span-2">
        <div className="border-[#cccccc] border-2 flex">
          <button className="bg-[#f3f3f3] px-2 py-1" title="Decrease" onClick={() => { handleUpdateCartItem(item.id, item.quantity - 1) }} disabled={item.quantity <= 1}>
            <Icon component={MinusIcon} />
          </button>
          <input
            className="w-14 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            disabled
            value={item.quantity}
          />
          <button className="bg-[#f3f3f3] px-2 py-1" title="Increase" onClick={() => { handleUpdateCartItem(item.id, item.quantity + 1) }}>
            <Icon component={AddIcon} />
          </button>
        </div>
      </div>
      <div className="flex justify-center col-span-2">
        <span className='hidden lg:flex'>Total:&nbsp;</span>
        <span>${(item.quantity * item.product.price).toFixed(2)}</span>
      </div>
      <div className="col-span-1 flex justify-end">
        <Icon component={DeleteIcon} className='hover:cursor-pointer opacity-50 hover:opacity-100 mr-3' onClick={() => handleDeleteCartItem(item.id)} />
      </div>
    </div>
  );
}
