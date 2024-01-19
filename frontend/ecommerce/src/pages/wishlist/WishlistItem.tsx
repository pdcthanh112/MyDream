import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Customer, Product, ProductImage } from '@models/type';
import { TableRow, TableCell, Icon } from '@mui/material';
import DefaultImage from '@assets/images/default-image.jpg';
import { useRouter } from 'next/router';
import { Popconfirm } from 'antd';
import { useTranslation } from 'next-i18next';
import { Button } from '@components/UI';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useRemoveProductFromWishlist } from '@hooks/wishlist/wishlistHook';
import { useAppSelector } from '@redux/store';
import { toast } from 'react-toastify';
import { stateStatus } from '@utils/constants';
import { getDefaultImageByProductId } from 'api/productApi';

type PropsType = {
  item: Product;
};

const WishlistItem = ({ item }: PropsType) => {
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);

  const router = useRouter();
  const { t } = useTranslation('common');

  const [image, setImage] = useState<ProductImage>();

  const { mutate: removeProductFromWishlist } = useRemoveProductFromWishlist();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDefaultImageByProductId(item.id);
      if (response && response.data) {
        setImage(response.data);
      }
    };
    fetchData();
  }, []);

  const checkStatus = (quantity: number, status: string) => {
    if (status === stateStatus.ACTIVE) {
      if (quantity > 0) {
        return <span className="text-status_active-text bg-status_active-background px-2 py-1 rounded">{t('common.in_stock')}</span>;
      } else {
        return <span className="text-status_inactive-text bg-status_inactive-background px-2 py-1 rounded">{t('common.out_of_stock')}</span>;
      }
    } else {
      return <span className="text-gray-500 bg-gray-300 px-2 py-1 rounded">{t('common.inactive')}</span>;
    }
  };

  const handleAddProductToCart = (productId: string) => {
    // addToCart('CART_ID',1, productId)
    toast.success('Edit successfully');
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      removeProductFromWishlist(
        { customerId: currentUser.userInfo.accountId, productId: productId },
        {
          onSuccess() {
            toast.success(t('wishlist.remove_item_from_wishlist_successfully'));
          },
          onError() {
            toast.error(t('wishlist.remove_item_from_wishlist_failed'));
          },
        },
      );
    } catch (error) {
      toast.error(t('wishlist.remove_item_from_wishlist_failed'));
    }
  };

  return (
    <TableRow key={item.id}>
      <TableCell component="th" scope="row" style={{ display: 'flex' }}>
        <Image src={image?.imagePath || DefaultImage} alt={image?.alt || "Product image"} width={100} height={100} loading="lazy" />
        <span
          title={item.name}
          style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}
          className="hover:cursor-pointer"
          onClick={() => router.push(`/product/${item.slug}`)}>
          {item.name}
        </span>
      </TableCell>
      <TableCell align="center">{item.category}</TableCell>
      <TableCell align="center">{item.price}</TableCell>
      <TableCell align="center">{checkStatus(item.quantity, item.status)}</TableCell>
      <TableCell align="right">
        <div className="flex justify-end">
          <Popconfirm
            title="Are you sure to remove this item from wishlist?"
            okText={t('common.yes')}
            okButtonProps={{ style: { backgroundColor: '#1677ff' } }}
            cancelText={t('common.no')}
            onConfirm={() => {
              handleRemoveFromWishlist(item.id);
            }}
            placement="topRight">
            <Icon titleAccess={t('common.remove_this_item')} component={DeleteIcon} className="hover:cursor-pointer opacity-50 hover:opacity-100" />
          </Popconfirm>
        </div>

        <Button className="bg-yellow-400 text-white rounded-xl" onClick={() => handleAddProductToCart(item.id)}>
          {t('common.add_to_cart')}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default WishlistItem;
