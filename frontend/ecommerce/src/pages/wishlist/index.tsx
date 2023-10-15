import { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Icon } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Popconfirm } from 'antd';
import Button from '@components/UI/Button';
import { Customer } from '@models/CustomerModel';
import { Product } from '@models/ProductModel';
import DefaultImage from '@assets/images/default-image.jpg';
import { stateStatus } from '@utils/constants';
import { toast } from 'react-toastify';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// import { Wishlist as IWishlist } from '@models/WishlistModel';
import { fetchWishlistRequested, removeItemFromWishlistRequested } from '@redux/actions/wishlist';
import { removeItemFromWishlistClean } from '@redux/reducers/wishlistReducer';
import { useQuery } from '@tanstack/react-query';
import { getWishlistByCustomer } from '@apis/wishlistApi';

const Wishlist: NextPage = (): React.ReactElement => {
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  // const wishlist: Wishlist = useAppSelector((state) => state.wishlist.data);
  const { data: wishlist, isLoading } = useQuery(['cart'], async () => await getWishlistByCustomer(currentUser.userInfo.accountId).then((response) => response.data));
  const wishlistState = useAppSelector((state) => state.wishlist);

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
    if (currentUser) {
      try {
        dispatch(removeItemFromWishlistRequested({ customerId: currentUser.userInfo.accountId, productId: productId }));
        if (!wishlistState.error && wishlistState.status === 'succeeded') {
          dispatch(fetchWishlistRequested({ customerId: currentUser.userInfo.accountId }));
          toast.success(t('wishlist.remove_item_successfully'));
        } else if (wishlistState.error) {
          toast.error(t('wishlist.remove_item_failed'));
        }
      } catch (error) {
        toast.error(t('wishlist.remove_item_failed'));
      } finally {
        dispatch(fetchWishlistRequested({ customerId: currentUser.userInfo.accountId }));
        dispatch(removeItemFromWishlistClean());
      }
    } else {
      // dispatch(openModalAuth());
    }
  };

  return (
    <div className="bg-white">
      <TableContainer component={Paper} style={{ width: '100vw' }}>
        <Table style={{ width: '85vw', margin: '0 auto' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ paddingLeft: '10rem', fontSize: '1.1rem', width: '40%' }}>{t('product.product_name')}</TableCell>
              <TableCell align="center" style={{ fontSize: '1.1rem' }}>
                {t('common.Category')}
              </TableCell>
              <TableCell align="center" style={{ fontSize: '1.1rem' }}>
                {t('product.price')}
              </TableCell>
              <TableCell align="center" style={{ fontSize: '1.1rem' }}>
                {t('common.status')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wishlist?.product.map((item: Product) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row" style={{ display: 'flex' }}>
                  <Image src={item.image || DefaultImage} alt="Product image" width={100} loading="lazy" />
                  <span style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }} className="hover:cursor-pointer" onClick={() => router.push(`/product/${item.id}`)}>
                    {item.name}
                  </span>
                </TableCell>
                <TableCell align="center">{item.category}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{checkStatus(item.quantity, item.status)}</TableCell>
                <TableCell align="right" style={{ width: '20%' }}>
                  <div className="flex justify-end">
                    <Popconfirm
                      title="Are you sure to remove this item from wishlist?"
                      okText={t('common.yes')}
                      okButtonProps={{style: { backgroundColor: '#1677ff' }}}
                      cancelText={t('common.no')}
                      onConfirm={() => {
                        handleRemoveFromWishlist(item.id);
                      }}
                      placement="topRight">
                      <Icon titleAccess={t('common.delete_this_item')} component={DeleteIcon} className="hover:cursor-pointer opacity-50 hover:opacity-100" />
                    </Popconfirm>
                  </div>

                  <Button className="bg-yellow-400 w-40" onClick={() => handleAddProductToCart(item.id)}>
                    {t('common.add_to_cart')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Wishlist;

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}
