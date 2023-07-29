'use client';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from '@components/Banner';
import { getAllProduct } from '@apis/productApi';
import ShowListProduct from '@components/Product/ShowListProduct';
import { PaginationParams } from 'models/Request';
import Pagination from '@components/Pagination';

const Home: NextPage = (): React.ReactElement => {
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
    <div className="mx-auto">
      <Banner />
      <div className="mx-auto mt-3 w-[80%]">
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

export default Home;

