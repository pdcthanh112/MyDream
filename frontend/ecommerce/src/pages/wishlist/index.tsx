'use client';
import { NextPage } from 'next';
import { useAppSelector } from '@redux/store';
import { useQuery } from '@tanstack/react-query';
import { Customer } from '@models/CustomerModel';
import { getWishlistByCustomer } from '@apis/wishlistApi';
import { Product } from '@models/ProductModel';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Icon } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Button from '@components/Button';
import DefaultImage from '@assets/images/default-image.jpg';
import { stateStatus } from '@utils/constants';
import { addToCart } from '@apis/cartItemApi';
import { toast } from 'react-toastify';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Wishlist: NextPage = (): React.ReactElement => {
  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);
  const { t } = useTranslation('common');
  const router = useRouter();

  const { data: wishlist, isLoading } = useQuery(['cart'], async () => await getWishlistByCustomer(currentUser.userData.accountId).then((response) => response.data));

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

  return (
    <>
      {isLoading ? (
        <span>Loading</span>
      ) : (
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
                {wishlist.product.map((item: Product) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row" style={{ display: 'flex' }}>
                      <Image src={item.image || DefaultImage} alt="Product image" width={100} />
                      <span style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }} className="hover:cursor-pointer" onClick={() => router.push(`/product/${item.id}`)}>
                        {item.name}
                      </span>
                    </TableCell>
                    <TableCell align="center">{item.category}</TableCell>
                    <TableCell align="center">{item.price}</TableCell>
                    <TableCell align="center">{checkStatus(item.quantity, item.status)}</TableCell>
                    <TableCell align="right" style={{ width: '20%' }}>
                      <div className="flex justify-end">
                        <Icon
                          titleAccess={t('common.delete_this_item')}
                          component={DeleteIcon}
                          className="hover:cursor-pointer opacity-50 hover:opacity-100"
                          // onClick={() => handleDeleteCartItem(item.id)}
                        />
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
      )}
    </>
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
