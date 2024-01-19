import { NextPage } from 'next';
import { useAppSelector } from '@redux/store';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Icon } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Customer, Product } from '@models/type';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import { getWishlistByCustomer } from 'api/wishlistApi';
import EmptyWishlistImage from '@assets/images/empty_wishlist.png';
import WishlistItem from './WishlistItem';

const Wishlist: NextPage = (): React.ReactElement => {
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const { t } = useTranslation('common');

  const { data: wishlist, isLoading } = useQuery(['wishlist'], async () => await getWishlistByCustomer(currentUser.userInfo.accountId).then((response) => response.data));

  return (
    <div className="bg-white w-full flex justify-center">
      <TableContainer component={Paper} style={{ width: '90%', margin: '10px 0 10px 0' }}>
        <Table style={{ width: '85vw', margin: '0 auto' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ paddingLeft: '10rem', width: '40%' }}>{t('product.product_name')}</TableCell>
              <TableCell align="center" width={'15%'}>
                {t('common.Category')}
              </TableCell>
              <TableCell align="center" width={'10%'}>
                {t('product.price')}
              </TableCell>
              <TableCell align="center" width={'10%'}>
                {t('common.status')}
              </TableCell>
              <TableCell align="center" width={'11%'} />
            </TableRow>
          </TableHead>
          {wishlist ? (
            <TableBody>
              {wishlist.product.map((item: Product) => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <EmptyWishlist />
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Wishlist;

const EmptyWishlist = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <div style={{ width: '250%' }}>
      <div className="flex justify-center">
        <Image src={EmptyWishlistImage} alt={'Empty wishlist'} width={300} height={300} />
      </div>

      <h6 className="flex justify-center hover:cursor-pointer hover:underline" onClick={() => router.push('/')}>
        {t('common.back_to_home')}
      </h6>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}
