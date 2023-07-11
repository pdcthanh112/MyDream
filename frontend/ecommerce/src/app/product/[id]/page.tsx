'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@apis/productApi';
import { Rating } from '@mui/material';
import Image from 'next/image';
import Daisy from '@assets/images/daisy1.jpg';
import { roundNumber } from '@utils/helper';
import Button from '@components/Button';
import AddToCartIcon from '@assets/icons/add-to-cart-icon.png';
import { addToCart } from '@apis/cartItemApi';
import ProductSkeleton from './product-skeleton';

export default function ProductDetail() {
  const param = useParams();
  const productId  = param?.id;

  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => await getProductById(productId).then((result) => result.data),
  });

  const addProductToCart = async () => {
    await addToCart(product.id, quantity, '8d4f19b5-491a-4d3c-a7e3-13aea1eb4986').then(() => {});
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
              <span>{roundNumber(product.ratingVote)} rating</span>
              <span className="opacity-80 mx-2">|</span>
              <span>Sold: {product.sold}</span>
            </div>
            <div>wishlist</div>
          </div>
          <div className="font-semibold text-3xl text-yellow-400">{product.price}</div>
          <div className="flex mt-10">
            <span className="flex items-center mr-10">Quantity</span>
            <div className="border-[#cccccc] border-2">
              <button className="bg-[#f3f3f3] px-3 py-2" onClick={() => setQuantity(quantity - 1)}>
                &mdash;
              </button>
              <input
                className="w-20 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                value={quantity}
              />
              <button className="bg-[#f3f3f3] px-3 py-2" onClick={() => setQuantity(quantity + 1)}>
                &#xff0b;
              </button>
            </div>
            <span className="flex items-center ml-10">{product.quantity - product.sold > 0 ? <p>{product.quantity - product.sold} available</p> : <p>Sold out</p>}</span>
          </div>
          <div className="flex mt-10">
            <Button className="bg-yellow-50 border-yellow-300 border-2 text-yellow-400" onClick={() => addProductToCart()}>
              <Image src={AddToCartIcon} alt="" width={24} />
              <span className="ml-1">Add to Cart</span>
            </Button>
            <Button className="bg-yellow-400 text-[#fff] ml-3" disable={product.quantity - product.sold <= 0}>
              <span className="mx-3">Buy now</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white mt-10 p-5">
        <h2 className="bg-yellow-100 px-2 py-1 rounded-sm">PRODUCT DETAIL</h2>
        <div className="grid grid-cols-4">
          <div className="col-span-1">Category</div>
          <div className="col-span-3">{product.category}</div>
          <div className="col-span-1">Subcategory</div>
          <div className="col-span-3">{product.subcategory}</div>
          <div className="col-span-1">In stock</div>
          <div className="col-span-3">{product.quantity - product.sold > 0 ? <p>{product.quantity - product.sold}</p> : <p>0</p>}</div>
        </div>
      </div>
      <div className="bg-white mt-10 p-5">
        <h2 className="bg-yellow-100 px-2 py-1 rounded-sm">PRODUCT DESCRIPTION</h2>
        <div className="">{product.description}</div>
      </div>
    </div>
  );
}
