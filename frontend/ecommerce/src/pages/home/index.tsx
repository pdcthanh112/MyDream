import { NextPage } from 'next';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from '@components/Banner';
import { getAllProduct } from '@apis/productApi';
import ShowListProduct from '@components/Product/ShowListProduct';
import { PaginationParams } from '@models/Request';
import Pagination from '@components/Pagination';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getAppData } from '@apis/appApi';
import { useAppDispatch } from '@redux/store';
import { fetchCategoryStart } from '@redux/actions/category';
import { fetchSubcategoryStart } from '@redux/actions/subcategory';

const Home: NextPage = ({ category, subcategory }: any): React.ReactElement => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  dispatch(fetchCategoryStart(category));
  dispatch(fetchSubcategoryStart(subcategory));

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

// export async function getServerSideProps(context: any) {
//   console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCC', context)
// // export async function getServerSideProps({ locale, req, resolvedUrl }:any) {
//   // const { payload, serverRoutes, domain } = await fetchServerConfigs(req, resolvedUrl);
//   return {
//     props: {
//       ...(await serverSideTranslations(context.locale, ['common'])),
//       // ...payload,
//       // domain,
//     },
//     // ...serverRoutes,
//   };
// }
export async function getServerSideProps(context: any) {
  const { category, subcategory } = await getAppData();

  return {
    props: {
      category,
      subcategory,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}

export default Home;
