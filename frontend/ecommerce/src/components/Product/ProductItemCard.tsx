import { Product } from '@model/ProductModel';
import Image from 'next/image';
import Daisy from '@assets/images/daisy1.jpg';
import { NumericFormat } from 'react-number-format';
import { Card } from '@mui/material'

export default function ProductItemCard({ product }: any) {
  return (
      <Card key={product.id} className='relative flex flex-col m-5 bg-white z-30 p-10'>
        <p className='absolute top-2 right-2 italic text-gray-400'>{product.category}</p>
        <Image
          src={product.image || Daisy}
          width={200}
          height={200} 
          alt="product image"
        />
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div>
          <NumericFormat value={product.price} prefix="$" />
        </div>
        <button>Add to Cart</button>
      </Card>
  );
}
