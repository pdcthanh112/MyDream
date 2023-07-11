'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProductBySubcategory } from '@apis/productApi';
import { PaginationParams } from 'models/Request';
import Pagination from '@components/Pagination';
import ShowListProduct from '@components/Product/ShowListProduct';
import NotFound from './not-found';
import { Skeleton } from '@mui/material';

export default function ProductBySubcategory() {
  const param = useParams();
  const { subcategory } = param;

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

  if (listProduct === null || listProduct?.length <= 0) return <NotFound />;

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" width={400} height={450} sx={{ marginTop: 2 }} animation="wave" />
        </>
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
  );
}
