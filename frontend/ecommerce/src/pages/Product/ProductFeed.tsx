import { Product } from 'models/ProductModel';
import ProductItemCard from './ProductItemCard';

interface ListProductProps {
  listProduct: Product[];
}

export default function ProductFeed({ listProduct }: ListProductProps) {

  return (
    <div className="grid gap-4 grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:-mt-52 mx-auto w-[80%]">
      {listProduct?.slice(0, 15).map((item: Product) => (
        <ProductItemCard key={item.id} product={item} />
      ))}

    </div>
  );
}
