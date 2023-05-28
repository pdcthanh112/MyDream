import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getGoodsById } from '@apis/goodsApi';

export default function GoodsDetail() {
  const router = useRouter();
  // const { GoodsId } = router.query;
  const { query: { GoodsId } } = useRouter();
  // const {data, isLoading} = useQuery({['goods', GoodsId], () => getGoodsById('15b025fc-84e0-4f91-b921-f706bdebc63b').then(res => {
  //   console.log('resssssssssssssssssss', res);
  // })});
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['goods'],
    queryFn: async() => await getGoodsById('15b025fc-84e0-4f91-b921-f706bdebc63b'),
  })

  const [goodsDetail, setGoodsDetail] = useState({});

  return <div>{GoodsId}</div>;
}
