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
    mutationFn: (cartId: string) => deleteCartItemApi(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries(['listRecruitmentPlan']);
    },
  });

  const handleDeleteCartItem = async (itemId: string) => {
    await confirm({
      title: 'Delete item',
      description: 'Are you sure to delete this item?',
    }).then(() => {});
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
          Total: ${item.quantity * item.product.price}
        </div>
        <div className="w-[10%]">
          <Image
            src={DeleteIcon}
            alt="Delete Icon"
            title="Delete item"
            width={30}
            className="hover:cursor-pointer"
            onClick={() => handleDeleteCartItem(item.id)}
          />
        </div>
      </div>
    </div>
  );
}
