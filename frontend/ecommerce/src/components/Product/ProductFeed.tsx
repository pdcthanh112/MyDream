import { Product } from '@model/ProductModel';
import ProductItemCard from './ProductItemCard';

export default function ProductFeed({ product }: any) {
    
  return (
    <div>
      {product?.map((item: Product) => (
        <ProductItemCard product={item}/>
      ))}
    </div>
  );
}
