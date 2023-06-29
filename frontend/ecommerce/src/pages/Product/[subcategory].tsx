'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getProductBySubcategory } from '@apis/productApi';
import { PaginationParams } from 'models/Request';
import ShowListProduct from './ShowListProduct';
import Pagination from '@components/Pagination';

export default function ProductBySubcategory() {
  const router = useRouter();
  const subcategory = router.query.subcategory;

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    totalPage: 0,
  });

  const { data: listProduct, isLoading } = useQuery({
    queryKey: ['todos', subcategory, pagination],
    queryFn: async () =>
      await getProductBySubcategory(subcategory, pagination.page - 1, pagination.limit).then((result) => {
        setPagination({ ...pagination, totalPage: result.data.totalPage });
        return result.data.responseList;
      }),
  });

  return (
    <>
      {listProduct ? (
        <>
          {isLoading ? (
            <div>loading</div>
          ) : (
            <div className="w-[90%] mx-auto">
              <ShowListProduct listProduct={listProduct} />

              <Pagination
                count={pagination.totalPage}
                page={pagination.page}
                onChange={(event: React.ChangeEvent<any>, page: number) => {
                  setPagination({ ...pagination, page: page });
                }}
              />
            </div>
          )}
        </>
      ) : (
        <div>list null</div>
      )}
    </>
  );
}
