import { useState } from 'react';
import { CartItem } from 'models/CartItemModel';
import DefaultImage from '@assets/images/default-image.jpg';
import Image from 'next/image';
import DeleteIcon from '@assets/icons/delete-icon.png';
import { deleteCartItem as deleteCartItemApi } from '@apis/cartItemApi';
import { useConfirm } from 'material-ui-confirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CartItemProps {
  item: CartItem;
}

export default function CartItem({ item }: CartItemProps) {
  console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',item)
  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState(item.quantity);

  const { isLoading, mutate: deleteCartItem } = useMutation({
    mutationKey: ['listCart'],
    mutationFn: async (cartId: string) => await deleteCartItemApi(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries(['listCart']);
    },
  });

  const handleDeleteCartItem = async (itemId: string) => {
    await confirm({
      title: 'Delete item',
      description: 'Are you sure to delete this item?',
    }).then(() => {
      deleteCartItem(itemId);
    });
  };

  return (
    <div className="flex items-center border border-gray-600 rounded my-2">
      <Image src={item.product.image || DefaultImage} alt="Product image" width={100} />

      <div className="w-[40%] ml-3">{item.product.name}</div>
      {/* <div className="w-[10%]">{item.quantity}</div> */}
      <div className="flex w-[30%]">
        <span className="flex items-center mr-5">Quantity</span>
        <div className="border-[#cccccc] border-2 flex col-span-3">
          <button className="bg-[#f3f3f3] px-3 py-2" onClick={() => setQuantity(quantity - 1)} title='Decrease' disabled={quantity <= 1}>
            &mdash;
          </button>
          <input
            className="w-16 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            disabled
            value={quantity}
          />
          <button className="bg-[#f3f3f3] px-3 py-2" onClick={() => setQuantity(quantity + 1)} title='Increase'>
            &#xff0b;
          </button>
        </div>
      </div>
      <div className="w-[20%]">Total: ${(item.quantity * item.product.price).toFixed(2)}</div>
      <div className="w-[5%]">
        <Image
          src={DeleteIcon}
          alt="Delete Icon"
          title="Delete item"
          width={30}
          className="hover:cursor-pointer opacity-50 hover:opacity-100"
          onClick={() => handleDeleteCartItem(item.id)}
        />
      </div>
    </div>
  );
}
