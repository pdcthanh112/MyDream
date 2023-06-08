import { ProductType } from '@model/ProductModel';
import Image from 'next/image';
import Daisy from '@assets/images/daisy1.jpg';
import { Card, Rating } from '@mui/material';
import Button from '@components/Button';
import { NumericFormat } from 'react-number-format';
import { useRouter } from 'next/router';
import { roundNumber } from '@utils/helper';

interface ProductProps {
  product: ProductType;
}

export default function ProductItemCard({ product }: ProductProps) {
  const router = useRouter();

  return (
    <Card
      key={product.id}
      title={product.name}
      className="relative flex flex-col mx-2 mb-2 bg-white z-30 p-3 text-sm hover:cursor-pointer"
      onClick={() => router.push(`/product-detail/${product.id}`)}
    >
      <Image src={product.image || Daisy} width={220} alt="Product image" />

      <h1 className="truncate opacity-70 hover:opacity-100 my-2">{product.name}</h1>

      <div className="mb-5 flex justify-end font-medium text-yellow-500 text-lg">
        <span>${product.price}</span>
      </div>

      <div className="flex justify-between">
        <span className='flex items-center'>
          <Rating precision={0.1} value={3.6} size="small" readOnly />
          <span className='ml-1'>{product.rating.value}</span>
        </span>
        <span className="mr-1">
          {roundNumber(product.rating.vote)} rating
          {/* <NumericFormat value={product.rating.vote} thousandsGroupStyle="thousand" decimalSeparator="," decimalScale={1} fixedDecimalScale readOnly/> */}
           </span>
      </div>

      <span className="italic ml-2">Sold: {product.sold}</span>
      <Button className="mt-auto button">Add to Cart</Button>
    </Card>
  );
}
