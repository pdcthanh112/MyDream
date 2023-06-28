import { CartItem } from 'models/CartItemModel';
import DefaultImage from '@assets/images/default-image.jpg';
import Image from 'next/image';
import DeleteIcon from '@assets/icons/delete-icon.png';
import { deleteCartItem as deleteCartItemApi, updateCartItem as updateCartItemApi } from '@apis/cartItemApi';
import { useConfirm } from 'material-ui-confirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface CartItemProps {
  item: CartItem;
}

export default function CartItem({ item }: CartItemProps) {
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
    <div className="flex items-center border border-gray-600 rounded my-2">
      <Image src={item.product.image || DefaultImage} alt="Product image" width={100} />

      <div className="w-[40%] ml-3 hover:cursor-pointer" onClick={() => router.push(`/product-detail/${item.product.id}`)}>{item.product.name}</div>
      {/* <div className="w-[10%]">{item.quantity}</div> */}
      <div className="flex items-center w-[30%]">
        <span className="hidden lg:flex mr-5">Quantity</span>
        <div className="border-[#cccccc] border-2 flex col-span-3">
          <button
            className="bg-[#f3f3f3] px-3 py-2"
            onClick={() => {
              handleUpdateCartItem(item.id, item.quantity - 1);
            }}
            title="Decrease"
            disabled={item.quantity <= 1}
          >
            &mdash;
          </button>
          <input
            className="w-16 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            disabled
            value={item.quantity}
          />
          <button
            className="bg-[#f3f3f3] px-3 py-2"
            onClick={() => {
              handleUpdateCartItem(item.id, item.quantity + 1);
            }}
            title="Increase"
          >
            &#xff0b;
          </button>
        </div>
      </div>
      <div className="w-[20%] flex">
        <span className='hidden lg:flex'>Total:&nbsp;</span>
        <span>${(item.quantity * item.product.price).toFixed(2)}</span>
      </div>
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
