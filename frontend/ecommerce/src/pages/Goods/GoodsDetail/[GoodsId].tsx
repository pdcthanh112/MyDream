import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getGoodsById } from '@apis/goodsApi';
import Skeleton from 'react-loading-skeleton';

export default function GoodsDetail() {
  const router = useRouter();
  const { GoodsId } = router.query;

  const { data: goods, isLoading } = useQuery(
    ['goods', GoodsId],
    async () => await getGoodsById(GoodsId).then((result) => result)
  );

  return (
  <React.Fragment>
    {isLoading ? <Skeleton/> :  <div>{goods.name}</div>}
   
    </React.Fragment>
    );
}
