import { ProductType } from '@model/ProductModel';
import ProductItemCard from './ProductItemCard';

interface ShowListProductProps {
  listProduct: ProductType[];
}

export default function ShowListProduct({ listProduct }: ShowListProductProps) {
  return (
    <div className="grid gap-4 grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {listProduct?.map((product: ProductType) => (
        <ProductItemCard key={product.id} product={product} />
      ))}
    </div>
  );
}