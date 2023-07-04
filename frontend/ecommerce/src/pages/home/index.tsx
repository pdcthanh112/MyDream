import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'app/page';
import Banner from '@components/Banner';
import { getAllProduct } from '@apis/productApi';
import { Product } from 'models/ProductModel';
import type { GetServerSideProps } from 'next';
import ShowListProduct from '@components/Product/ShowListProduct';
import { RootLayout } from 'app/layout';

interface ListProductProps {
  listProduct: Product[];
}

const Home: NextPageWithLayout<ListProductProps> = ({ listProduct }: ListProductProps) => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Banner />
      <div className="mx-auto w-[80%]">
        <ShowListProduct listProduct={listProduct} />
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listProduct: Product[] = await getAllProduct().then((response) => response.data);
  return {
    props: {
      listProduct,
    },
  };
};
