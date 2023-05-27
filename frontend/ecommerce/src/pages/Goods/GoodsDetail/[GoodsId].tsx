import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getGoodsById } from '@apis/goodsApi';

export default function GoodsDetail() {
  const router = useRouter();
  const { GoodsId } = router.query;
console.log('+++++++++++++++++++++++++++++++++', GoodsId);

  const {} = useQuery(['goods', GoodsId], async => getGoodsById('15b025fc-84e0-4f91-b921-f706bdebc63b'));

  const [goodsDetail, setGoodsDetail] = useState({});

  return <div>{GoodsId}</div>;
}
