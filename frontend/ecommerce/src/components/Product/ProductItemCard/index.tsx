import Image from 'next/image';
import Daisy from '@assets/images/daisy1.jpg';
import { Card, Rating, Icon } from '@mui/material';
import Button from '@components/UI/Button';
import { useRouter } from 'next/router';
import { roundNumber } from '@utils/helper';
import { ShoppingCart, Source } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useTranslation } from 'next-i18next';
import { openModalAuth } from '@redux/features/modalAuth';
import { Product } from '@models/ProductModel';
import { Customer } from '@models/CustomerModel';
import { Wishlist } from '@models/WishlistModel';
import { addItemToWishlistRequested, fetchWishlistRequested, removeItemFromWishlistRequested } from '@redux/actions/wishlist';
import { toast } from 'react-toastify';
import { addItemToWishlistClean, removeItemFromWishlistClean } from '@redux/reducers/wishlistReducer';
import { HeartEmpty, HeartFull } from '@assets/icons';

interface ProductProps {
  product: Product;
}

const ProductItemCard = ({ product }: ProductProps) => {
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const router = useRouter();
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const wishlist: Wishlist = useAppSelector((state) => state.wishlist.data);
  const wishlistState = useAppSelector((state) => state.wishlist);

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
        dispatch(addItemToWishlistRequested({ customerId: currentUser.userInfo.accountId, productId: productId }));
        if (!wishlistState.error && wishlistState.status === 'succeeded') {
          dispatch(fetchWishlistRequested({ customerId: currentUser.userInfo.accountId }));
          toast.success(t('wishlist.add_item_successfully'));
        } else if (wishlistState.error) {
          if (wishlistState.error?.errorCode === 403101) {
            toast.error(t('wishlist.item_already_exists_in_wishlist'));
          }
        }
      } catch (error) {
        toast.error(t('wishlist.add_item_to_wishlist_failed'));
      } finally {
        dispatch(fetchWishlistRequested({ customerId: currentUser.userInfo.accountId }));
        dispatch(addItemToWishlistClean());
      }
    } else {
      dispatch(openModalAuth());
    }
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
      dispatch(openModalAuth());
    }
  };

  return (
    <Card key={product.id} title={product.name} className=" bg-white z-30 p-3 text-sm hover:cursor-pointer">
      <div className="w-full h-auto flex items-center justify-center relative group">
        <Image src={product.image || Daisy} width={220} alt="Product image" />
        <ul className="w-full h-36 bg-gray-100 absolute -bottom-36 flex flex-col items-end justify-center gap-2 font-semibold px-2 border-l border-r group-hover:bottom-0 duration-700">
          <li className="productLi" onClick={() => handleAddToCart(product.id)}>
            {t('common.add_to_cart')}
            <Icon component={ShoppingCart} />
          </li>
          <li className="productLi" onClick={() => router.push(`/product/${product.id}`)}>
            {t('common.view_detail')}
            <Icon component={Source} />
          </li>
          {wishlist?.product.find((item) => item.id === product.id) === undefined ? (
            <li className="productLi" onClick={() => handleAddToWishlist(product.id)}>
              {t('common.add_to_wishlist')}
              <Icon component={HeartEmpty} />
            </li>
          ) : (
            <li className="productLi" onClick={() => handleRemoveFromWishlist(product.id)}>
              {t('common.remove_from_wishlist')}
              <Icon component={HeartFull} />
            </li>
          )}
        </ul>
      </div>

      <div className="relative z-50 bg-white">
        <h1 className="truncate opacity-70 hover:opacity-100 my-2">{product.name}</h1>

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
