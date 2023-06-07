import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@apis/productApi';
import Skeleton from 'react-loading-skeleton';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: product, isLoading } = useQuery(
    ['product', id],
    async () => await getProductById(id).then((result) => result.data)
  );

  return (
    <div className="w-[80%] mx-auto">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className='bg-white mt-3'>{product.name}</div>
        </>
      )}
    </div>
  );
}
