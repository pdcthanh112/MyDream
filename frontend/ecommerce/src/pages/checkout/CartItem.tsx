import { CartItemType } from '@model/CartItemModel';
import DefaultImage from '@assets/images/default-image.jpg';
import Image from 'next/image';
import DeleteIcon from '@assets/icons/delete-icon.png';
import { deleteCartItem as deleteCartItemApi } from '@apis/cartItemApi';
import { useConfirm } from 'material-ui-confirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const confirm = useConfirm();
  const queryClient = useQueryClient();

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
    <div className="grid grid-cols-12 border border-rose-600 rounded my-2">
      <Image
        src={item.product.image || DefaultImage}
        alt="Product image"
        width={100}
      />
      <div className="flex items-center col-span-11">
        <div className="w-[60%] ml-3">{item.product.name}</div>
        <div className="w-[10%]">{item.quantity}</div>
        <div className="w-[20%]">
          Total: ${(item.quantity * item.product.price).toFixed(1)}
        </div>
        <div className="w-[10%]">
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
    </div>
  );
}
