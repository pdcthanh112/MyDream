import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from '@components/Banner';
import { getAllProduct } from '@apis/productApi';
import ShowListProduct from '@components/Product/ShowListProduct';
import { PaginationParams } from '@models/Request';
import Pagination from '@components/Pagination';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { store, useAppDispatch } from '@redux/store';

import { fetchCategoryRequested } from '@redux/actions/category';
import { fetchSubcategoryRequested } from '@redux/actions/subcategory';

const Home: NextPage = (): React.ReactElement => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    totalPage: 0,
  });

  useEffect(() => {
    dispatch(fetchSubcategoryRequested())
    dispatch(fetchCategoryRequested());
  }, []);

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
        <ShowListProduct listProduct={listProduct} loading={isLoading} />
        <div className="flex justify-end">
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
};

export async function getServerSideProps(context: any) {
  // store.dispatch(fetchCategoryStart(context.category));
  // store.dispatch(fetchSubcategoryStart(context.subcategory));

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}

export default Home;
