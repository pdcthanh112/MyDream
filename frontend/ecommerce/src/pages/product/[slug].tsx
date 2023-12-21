'use client';
import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getAttributeByProductId, getImageByProductId, getProductBySlug } from 'api/productApi';
import { Rating, Icon, Avatar, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { Add as AddIcon, Remove as MinusIcon, Storefront, ForumOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { Image as AntdImage, Carousel } from 'antd';
import Daisy from '@assets/images/daisy1.jpg';
import { roundNumber } from '@utils/helper';
import Button from '@components/UI/Button';
import ProductSkeleton from './product-skeleton';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useAddProductToWishlist, useRemoveProductFromWishlist } from '@hooks/wishlist/wishlistHook';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { Customer } from '@models/CustomerModel';
import { Wishlist } from '@models/WishlistModel';
import { openModalAuth } from '@redux/features/modalAuth';
import { HeartEmpty, HeartFull } from '@assets/icons';
import { toast } from 'react-toastify';
import { useAddProductToCart } from '@hooks/cart/cartHook';
import { getWishlistByCustomer } from 'api/wishlistApi';
import { Store } from '@models/StoreModel';
import { getStoreById } from 'api/storeApi';
import Link from 'next/link';
import { getRatingStarofProduct } from 'api/reviewApi';
import { AttributeValue, ProductImage } from '@models/ProductModel';

const ProductDetail: NextPage = (): React.ReactElement => {
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const router = useRouter();
  const { slug: productSlug } = router.query;

  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const [quantity, setQuantity] = useState(1);
  const [ratingStar, setRatingStar] = useState<{ vote: number; value: number }>({ vote: 0, value: 0.0 });
  const [store, setStore] = useState<Store>();
  const [productAttribute, setProductAttribute] = useState<AttributeValue[]>();
  const [productImage, setProductImage] = useState<ProductImage[]>();

  const { mutate: addProductToCart } = useAddProductToCart();

  const { mutate: addProductToWishlist } = useAddProductToWishlist();
  const { mutate: removeProductFromWishlist } = useRemoveProductFromWishlist();

  const { data: product, isLoading } = useQuery(['product'], async () => await getProductBySlug(productSlug).then((result) => result.data), {
    onSuccess: async (data) => {
      await getRatingStarofProduct(data.id).then((response) => {
        if (response && response.data) {
          setRatingStar(response.data);
        }
      });
      await getStoreById(data.store).then((response) => {
        if (response && response.data) {
          setStore(response.data);
        }
      });
      await getAttributeByProductId(data.id).then((response) => {
        if (response && response.data) {
          setProductAttribute(response.data);
        }
      });
      await getImageByProductId(data.id).then((response) => {
        if (response && response.data) {
          setProductImage(response.data);
        }
      });
    },
  });

  const { data: wishlist } = useQuery<Wishlist>(['wishlist'], async () => await getWishlistByCustomer(currentUser.userInfo.accountId).then((result) => result.data));

  const handleAddProductToCart = () => {
    if (currentUser) {
      try {
        addProductToCart(
          { productId: product.id, quantity: quantity, cartId: '36c98af9-bee7-4e11-bd19-36426261d727' },
          {
            onSuccess() {
              toast.success(t('cart.add_item_to_cart_successfully'));
            },
            onError(error) {
              toast.error(t('cart.add_item_to_cart_failed'));
              console.log(error);
            },
          },
        );
      } catch (error) {
        toast.error(t('cart.add_item_to_cart_failed'));
      }
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
              toast.success(t('wishlist.add_item_to_wishlist_successfully'));
            },
            onError() {
              toast.error(t('wishlist.add_item_to_wishlist_failed'));
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

  const handleRemoveFromWishlist = (productId: string) => {
    if (currentUser) {
      try {
        removeProductFromWishlist(
          { customerId: currentUser.userInfo.accountId, productId: productId },
          {
            onSuccess() {
              toast.success(t('wishlist.remove_item_from_wishlist_successfully'));
            },
            onError(error) {
              toast.error(t('wishlist.remove_item_from_wishlist_failed'));
              console.log(error);
            },
          },
        );
      } catch (error) {
        toast.error(t('wishlist.remove_item_from_wishlist_failed'));
      }
    } else {
      dispatch(openModalAuth());
    }
  };

  if (isLoading) return <ProductSkeleton />;

  return (
    <div className="w-[80%] mx-auto my-3">
      <div className="bg-white flex">
        <div className="w-[40%] py-3">
          <div className="justify-center flex">
            <AntdImage src={product.image || Daisy} alt="Product image" width={300} />
          </div>
          <AntdImage.PreviewGroup>
            {/* <Carousel style={{ width: '10vw' }} arrows={true} dots={false}> */}
              {productImage?.map((item: ProductImage) => <Image key={item.id} width={100} height={100} src={item.imagePath} alt={item.alt || 'Product image'} />)}
            {/* </Carousel> */}
          </AntdImage.PreviewGroup>
        </div>
        <div className="w-[60%] p-3">
          <h1 className="font-medium text-2xl">{product.name}</h1>
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="mr-1">{ratingStar.value.toFixed(1)}</span>
              <Rating value={ratingStar.value} precision={0.1} size="small" readOnly />
              <span className="opacity-80 mx-2">|</span>
              <span>
                {roundNumber(ratingStar.vote)} {t('product.rating')}
              </span>
              <span className="opacity-80 mx-2">|</span>
              <span>
                {t('product.sold')}: {product.sold}
              </span>
            </div>
            <div>
              {wishlist?.product.find((item) => item.id === product.id) === undefined ? (
                <span className="hover:cursor-pointer" title={t('common.add_to_wishlist')} onClick={() => handleAddToWishlist(product.id)}>
                  <Icon component={HeartEmpty} sx={{ color: 'red' }} />
                </span>
              ) : (
                <span className="hover:cursor-pointer" title={t('common.remove_from_wishlist')} onClick={() => handleRemoveFromWishlist(product.id)}>
                  <Icon component={HeartFull} sx={{ color: 'red' }} />
                </span>
              )}
            </div>
          </div>
          <div className="font-semibold text-3xl text-yellow-400">{product.price}</div>
          <div className="flex mt-10">
            <span className="flex items-center mr-10">{t('product.Quantity')}</span>
            <div className="border-[#cccccc] border-2">
              <button className="bg-[#f3f3f3] px-3 py-2" disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)}>
                <Icon component={MinusIcon} />
              </button>
              <input
                type="number"
                className="w-20 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={quantity}
              />
              <button className="bg-[#f3f3f3] px-3 py-2" onClick={() => setQuantity(quantity + 1)}>
                <Icon component={AddIcon} />
              </button>
            </div>
            <span className="flex items-center ml-10">
              {product.quantity - product.sold > 0 ? (
                <p>
                  {product.quantity - product.sold} {t('common.available')}
                </p>
              ) : (
                <p>{t('common.sold_out')}</p>
              )}
            </span>
          </div>
          <div className="flex mt-10">
            <Button className="bg-yellow-50 border-yellow-300 border-2 text-yellow-400" onClick={() => handleAddProductToCart()}>
              <AddToCartIcon width={28} height={28} />
              <span className="ml-1">{t('common.add_to_cart')}</span>
            </Button>
            <Button className="bg-yellow-400 text-[#fff] ml-3" disable={product.quantity - product.sold <= 0}>
              <span className="mx-3">{t('product.buy_now')}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white mt-10 p-5 flex">
        <div className="w-[35%] flex">
          <Avatar src={store?.avatar} alt="Store Avatar" style={{ width: '6rem', height: '6rem' }} />
          <div className="w-full ml-3">
            <h3 className="mb-2">{store?.name}</h3>
            <div className="flex">
              <Button className=" bg-yellow-100 border-solid border-2 border-yellow-300 text-yellow-400 mr-3">
                <Icon component={ForumOutlined} />
                <span>{t('common.contact')}</span>
              </Button>
              <Link href={`/store/${store?.id}`} className=" border-solid border-2 border-gray-300 flex items-center px-2">
                <Icon component={Storefront} />
                <span>{t('store.view_store')}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-red-400 w-[65%]">asdfasjl</div>
      </div>
      <div className="bg-white mt-10 p-5">
        <h2 className="bg-yellow-100 px-2 py-1 rounded-sm">{t('product.product_detail').toUpperCase()}</h2>
        <div className="grid grid-cols-4">
          <div className="col-span-1">{t('common.Category')}</div>
          <div className="col-span-3">{product.category}</div>
          <div className="col-span-1">{t('common.Subcategory')}</div>
          <div className="col-span-3">{product.subcategory}</div>
          <div className="col-span-1">{t('common.in_stock')}</div>
          <div className="col-span-3">{product.quantity - product.sold > 0 ? <p>{product.quantity - product.sold}</p> : <p>0</p>}</div>
        </div>
      </div>
      <div className="bg-white mt-10 p-5">
        <h2 className="bg-yellow-100 px-2 py-1 rounded-sm">{t('product.product_attribute').toUpperCase()}</h2>
        <TableContainer>
          <Table>
            <TableBody>
              {productAttribute?.map((item: AttributeValue) => (
                <TableRow key={item.id}>
                  <TableCell>{item.attribute.name}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="bg-white mt-10 p-5">
        <h2 className="bg-yellow-100 px-2 py-1 rounded-sm">{t('product.product_description').toUpperCase()}</h2>
        <div className="">{product.description}</div>
      </div>
    </div>
  );
};

const AddToCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg baseProfile="tiny" viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
    <path d="M20.756 5.345A1.003 1.003 0 0020 5H6.181l-.195-1.164A1 1 0 005 3H2.75a1 1 0 100 2h1.403l1.86 11.164.045.124.054.151.12.179.095.112.193.13.112.065a.97.97 0 00.367.075H18a1 1 0 100-2H7.847l-.166-1H19a1 1 0 00.99-.858l1-7a1.002 1.002 0 00-.234-.797zM18.847 7l-.285 2H15V7h3.847zM14 7v2h-3V7h3zm0 3v2h-3v-2h3zm-4-3v2H7l-.148.03L6.514 7H10zm-2.986 3H10v2H7.347l-.333-2zM15 12v-2h3.418l-.285 2H15z" />
    <path d="M10 19.5 A1.5 1.5 0 0 1 8.5 21 A1.5 1.5 0 0 1 7 19.5 A1.5 1.5 0 0 1 10 19.5 z" />
    <path d="M19 19.5 A1.5 1.5 0 0 1 17.5 21 A1.5 1.5 0 0 1 16 19.5 A1.5 1.5 0 0 1 19 19.5 z" />
  </svg>
);

export default ProductDetail;

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
