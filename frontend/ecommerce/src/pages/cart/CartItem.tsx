import { CartItem } from '@models/CartModel';
import DefaultImage from '@assets/images/default-image.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Icon } from '@mui/material';
import { Add as AddIcon, Remove as MinusIcon, Delete } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import { useDeleteCartItem, useUpdateCartItem } from '@hooks/cart/cartHook';
import { Popconfirm } from 'antd';

interface CartItemProps {
  item: CartItem;
}

const CartItem = ({ item }: CartItemProps): React.ReactElement => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: deleteCartItem } = useDeleteCartItem();

  const handleUpdateCartItem = (cartItemId: string, quantity: number) => {
    updateCartItem({ itemId: cartItemId, quantity: quantity }, {});
  };

  const handleDeleteCartItem = (itemId: string) => {
    deleteCartItem(itemId, {})
  };

  return (
    <div className=" items-center border border-gray-600 rounded my-2 grid grid-cols-12">
      <Image src={item.product.image || DefaultImage} alt="Product image" className="col-span-1" width={100} />

      <div className="ml-3 col-span-6">
        <span className="hover:cursor-pointer" onClick={() => router.push(`/product/${item.product.id}`)}>
          {item.product.name}
        </span>
      </div>

      <div className="flex items-center col-span-2">
        <div className="border-[#cccccc] border-2 flex">
          <button
            className="bg-[#f3f3f3] px-2 py-1"
            title={t('common.decrease')}
            onClick={() => {
              handleUpdateCartItem(item.id, item.quantity - 1);
            }}
            disabled={item.quantity <= 1}>
            <Icon component={MinusIcon} />
          </button>
          <input
            className="w-14 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            disabled
            value={item.quantity}
          />
          <button
            className="bg-[#f3f3f3] px-2 py-1"
            title={t('common.increase')}
            onClick={() => {
              handleUpdateCartItem(item.id, item.quantity + 1);
            }}>
            <Icon component={AddIcon} />
          </button>
        </div>
      </div>
      <div className="flex justify-center col-span-2">
        <span className="hidden lg:flex">Total:&nbsp;</span>
        <span>${(item.quantity * item.product.price).toFixed(2)}</span>
      </div>
      <div className="col-span-1 flex justify-end">
        <Popconfirm title="Delete cart item" description="Are you sure to delete this item?" onConfirm={() => handleDeleteCartItem(item.id)} okText="Yes" cancelText="No">
          <Icon component={Delete} className="hover:cursor-pointer opacity-50 hover:opacity-100 mr-3" />
        </Popconfirm>
      </div>
    </div>
  );
};

export default CartItem;
