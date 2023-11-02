import Image from 'next/image';
import Daisy from '@assets/images/daisy1.jpg';
import { Card, Rating, Icon } from '@mui/material';
import Button from '@components/UI/Button';
import { useRouter } from 'next/router';
import { roundNumber } from '@utils/helper';
import { ShoppingCart, Source } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import { openModalAuth } from '@redux/features/modalAuth';
import { Product } from '@models/ProductModel';
import { Customer } from '@models/CustomerModel';
import { toast } from 'react-toastify';
import { HeartEmpty, HeartFull } from '@assets/icons';
import { useAddProductToWishlist, useRemoveProductFromWishlist } from '@hooks/wishlist/wishlistHook';
import { getWishlistByCustomer } from '@apis/wishlistApi';
import { Wishlist } from '@models/WishlistModel';

interface ProductProps {
  product: Product;
}

const ProductItemCard = ({ product }: ProductProps) => {
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const router = useRouter();
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { data: wishlist } = useQuery(['wishlist'], async () => await getWishlistByCustomer(currentUser.userInfo.accountId).then((response) => response.data));

  const { mutate: addProductToWishlist } = useAddProductToWishlist();
  const { mutate: removeProductFromWishlist } = useRemoveProductFromWishlist();

  const handleAddToCart = (productId: string) => {
    if (currentUser) {
      //  setshowSelectCart(true)
      // addToCart('CART_ID', 1, productId);
    } else {
      dispatch(openModalAuth());
    }
  };

  const handleAddToWishlist = (productId: string) => {
    if (currentUser) {
      try {
        addProductToWishlist(
          { customerId: currentUser.userInfo.accountId, productId: productId },
          {
            onSuccess() {
              toast.success(t('wishlist.add_item_successfully'));
            },
            onError(error) {
              toast.error(t('wishlist.add_item_failed'));
              console.log(error);
            },
          },
        );
      } catch (error) {
        toast.error(t('wishlist.add_item_to_wishlist_failed'));
      }
    } else {
      dispatch(openModalAuth());
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (currentUser) {
      try {
        removeProductFromWishlist(
          { customerId: currentUser.userInfo.accountId, productId: productId },
          {
            onSuccess() {
              toast.success(t('wishlist.remove_item_successfully'));
            },
            onError(error) {
              toast.error(t('wishlist.remove_item_failed'));
              console.log(error);
            },
          },
        );
      } catch (error) {
        toast.error(t('wishlist.remove_item_failed'));
      }
    } else {
      dispatch(openModalAuth());
    }
  };

  return (
    <Card key={product.id} className=" bg-white z-30 p-3 text-sm hover:cursor-pointer">
      <div className="w-full h-auto flex items-center justify-center relative group">
        <Image src={product.image || Daisy} width={220} alt="Product image" />
        <ul className="w-full h-36 bg-gray-100 absolute -bottom-36 flex flex-col items-end justify-center gap-2 font-semibold px-2 border-l border-r group-hover:bottom-0 duration-700">
          <li className="productLi" title={t('common.add_to_cart')} onClick={() => handleAddToCart(product.id)}>
            {t('common.add_to_cart')}
            <Icon component={ShoppingCart} />
          </li>
          <li className="productLi" title={t('common.view_detail')} onClick={() => router.push(`/product/${product.id}`)}>
            {t('common.view_detail')}
            <Icon component={Source} />
          </li>
          {wishlist?.product.find((item: Wishlist) => item.id === product.id) === undefined ? (
            <li className="productLi" title={t('common.add_to_wishlist')} onClick={() => handleAddToWishlist(product.id)}>
              {t('common.add_to_wishlist')}
              <Icon component={HeartEmpty} />
            </li>
          ) : (
            <li className="productLi" title={t('common.remove_from_wishlist')} onClick={() => handleRemoveFromWishlist(product.id)}>
              {t('common.remove_from_wishlist')}
              <Icon component={HeartFull} />
            </li>
          )}
        </ul>
      </div>

      <div className="relative z-50 bg-white">
        <h1 className="truncate opacity-70 hover:opacity-100 my-2" title={product.name}>
          {product.name}
        </h1>

        <div className="mb-5 flex justify-end font-medium text-yellow-500 text-lg">
          <span>${product.price}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center">
            <Rating precision={0.1} value={product.ratingValue} size="small" readOnly />
            <span className="ml-1">{product.ratingValue.toFixed(1)}</span>
          </span>

          <span className="mr-1">
            {roundNumber(product.ratingVote)} {t('product.rating')}
          </span>
        </div>

        <span className="italic ml-2">
          {t('product.Sold')}: {product.sold}
        </span>

        <Button className="w-full bg-yellow-400" onClick={() => handleAddToCart(product.id)}>
          {t('common.add_to_cart')}
        </Button>
      </div>
    </Card>
  );
};

export default ProductItemCard;
