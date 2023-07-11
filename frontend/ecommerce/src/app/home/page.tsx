'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from '@components/Banner';
import { getAllProduct } from '@apis/productApi';
import ShowListProduct from '@components/Product/ShowListProduct';
import { PaginationParams } from 'models/Request';
import Pagination from '@components/Pagination';

export default function Home() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    totalPage: 0,
  });

  const { data: listProduct, isLoading } = useQuery({
    queryKey: ['listProduct', pagination],
    queryFn: async () =>
      await getAllProduct(pagination.page - 1, pagination.limit).then((result) => {
        setPagination({ ...pagination, totalPage: result.data.totalPage });
        return result.data.responseList;
      }),
  });

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Banner />
      <div className="mx-auto w-[80%]">
        <ShowListProduct listProduct={listProduct} />
        <div className='flex justify-end'>
        <Pagination
          count={pagination.totalPage}
          page={pagination.page}
          onChange={(event: React.ChangeEvent<any>, page: number) => {
            setPagination({ ...pagination, page: page });
          }}
        />
        </div>
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const listProduct: Product[] = await getAllProduct().then((response) => response.data);
//   return {
//     props: {
//       listProduct,
//     },
//   };
// };
