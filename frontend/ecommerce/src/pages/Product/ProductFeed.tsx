import { useState } from 'react';
import { Product } from '@model/ProductModel';

import Image from 'next/image';
import Daisy from '@assets/images/daisy2.jpg';
import { PaginationParams } from '@model/Request';
import ProductItemCard from './ProductItemCard';

interface ListProductProps {
  listProduct: Product[];
}

export default function ProductFeed({ listProduct }: ListProductProps) {
  // const [pagination, setPagination] = useState<PaginationParams>({
  //   page: 1,
  //   limit: 12,
  //   totalPage: 0,
  // });

  return (
    <div className="grid gap-4 grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:-mt-52 mx-auto w-[80%]">
      {listProduct?.slice(0, 15).map((item: Product) => (
        <ProductItemCard key={item.id} product={item} />
      ))}

      {/* <Image src={Daisy} alt={'Daisy'} className="md:col-span-full" /> */}

      {/* <div className="md:col-span-2">
        {product.data?.slice(4, 5).map((item: Product) => (
          <ProductItemCard product={item} />
        ))}
      </div>

      {product.data?.slice(5, product.length).map((item: Product) => (
        <ProductItemCard product={item} />
      ))} */}
    </div>
  );
}
