import { Product } from '@model/ProductModel';
import ProductItemCard from './ProductItemCard';
import Image from 'next/image';
import Daisy from '@assets/images/daisy2.jpg';
export default function ProductFeed({ product }: any) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {product.data?.slice(0, 4).map((item: Product) => (
        <ProductItemCard product={item} />
      ))}

      <Image src={Daisy} alt={'Daisy'} className="md:col-span-full" />

      <div className="md:col-span-2">
        {product.data?.slice(4, 5).map((item: Product) => (
          <ProductItemCard product={item} />
        ))}
      </div>

      {product.data?.slice(5, product.length).map((item: Product) => (
        <ProductItemCard product={item} />
      ))}
    </div>
  );
}
