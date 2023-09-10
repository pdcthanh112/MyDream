import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@apis/productApi';
import { Rating, Icon } from '@mui/material';
import Image from 'next/image';
import Daisy from '@assets/images/daisy1.jpg';
import { roundNumber } from '@utils/helper';
import Button from '@components/Button';
import ProductSkeleton from './product-skeleton';
import { Add as AddIcon, Remove as MinusIcon } from '@mui/icons-material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { addToCart } from '@apis/cartApi';

const ProductDetail: NextPage = (): React.ReactElement => {
  const router = useRouter();
  const { id: productId } = router.query;

  const [quantity, setQuantity] = useState(1);

  const { t } = useTranslation('common');

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => await getProductById(productId).then((result) => result.data),
  });

  const addProductToCart = async () => {
    await addToCart({productId: product.id, quantity: quantity, cartId: '8d4f19b5-491a-4d3c-a7e3-13aea1eb4986'}).then(() => {});
  };

  if (isLoading) return <ProductSkeleton />;

  return (
    <div className="w-[80%] mx-auto my-3">
      <div className="bg-white flex">
        <div className="w-[40%] justify-center flex py-3">
          <Image src={product.image || Daisy} width={300} alt="Product image" />
        </div>
        <div className="w-[60%] p-3">
          <h1 className="font-medium text-2xl">{product.name}</h1>
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="mr-1">{product.ratingValue}</span>
              <Rating value={product.ratingValue} precision={0.1} size="small" readOnly />
              <span className="opacity-80 mx-2">|</span>
              <span>
                {roundNumber(product.ratingVote)} {t('product.rating')}
              </span>
              <span className="opacity-80 mx-2">|</span>
              <span>
                {t('product.sold')}: {product.sold}
              </span>
            </div>
            <div>wishlist</div>
          </div>
          <div className="font-semibold text-3xl text-yellow-400">{product.price}</div>
          <div className="flex mt-10">
            <span className="flex items-center mr-10">{t('product.Quantity')}</span>
            <div className="border-[#cccccc] border-2">
              <button className="bg-[#f3f3f3] px-3 py-2" disabled={quantity <= 0} onClick={() => setQuantity(quantity - 1)}>
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
            <Button className="bg-yellow-50 border-yellow-300 border-2 text-yellow-400" onClick={() => addProductToCart()}>
              <AddToCartIcon width={28} height={28} />
              <span className="ml-1">{t('common.add_to_cart')}</span>
            </Button>
            <Button className="bg-yellow-400 text-[#fff] ml-3" disable={product.quantity - product.sold <= 0}>
              <span className="mx-3">{t('product.buy_now')}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white mt-10 p-5">
        <h2 className="bg-yellow-100 px-2 py-1 rounded-sm">{t('product.product_detail').toUpperCase()}</h2>
        <div className="grid grid-cols-4">
          <div className="col-span-1">{t('common.Category')}</div>
          <div className="col-span-3">{product.category}</div>
          <div className="col-span-1">{t('common.Subcategory')}</div>
          <div className="col-span-3">{product.subcategory}</div>
          <div className="col-span-1">{t('product.in_stock')}</div>
          <div className="col-span-3">{product.quantity - product.sold > 0 ? <p>{product.quantity - product.sold}</p> : <p>0</p>}</div>
        </div>
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

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}
