import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@apis/productApi';
import Skeleton from 'react-loading-skeleton';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: product, isLoading } = useQuery(
    ['product', id],
    async () => await getProductById(id).then((result) => result)
  );

  return (
  <React.Fragment>
    {/* {isLoading ? <Skeleton/> :  <div>{product.name}</div>} */}
   GOODDDDDDDDDDDDDDDDDDD
    </React.Fragment>
    );
}
