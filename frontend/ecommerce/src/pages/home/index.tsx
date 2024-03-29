'use client';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from '@components/Banner';
import { getAllProduct } from 'api/productApi';
import ShowListProduct from '@components/Product/ShowListProduct';
import Pagination from '@components/UI/Pagination';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { fetchCategoryRequested } from '@redux/actions/category';
import { fetchSubcategoryRequested } from '@redux/actions/subcategory';
import { fetchWishlistRequested } from '@redux/actions/wishlist';
import { PaginationParams } from '@models/type/Request';
import { useRouter } from 'next/router';
import { Customer } from '@models/type';

const Home: NextPage = (): React.ReactElement => {
  const { locale } = useRouter();
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    totalPage: 0,
  });

  useEffect(() => {
    dispatch(fetchSubcategoryRequested());
    dispatch(fetchCategoryRequested());
    if (currentUser) {
      dispatch(fetchWishlistRequested({ customerId: currentUser.userInfo.accountId }));
    }
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
    <React.Fragment>
      <Banner />
      <div className="mx-auto mt-3 w-[80%] ">
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
    </React.Fragment>
  );
};

export async function getServerSideProps({ locale }: any) {
  // store.dispatch(fetchSubcategoryRequested());
  // store.dispatch(fetchCategoryRequested());

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Home;
