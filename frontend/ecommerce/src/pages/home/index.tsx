import Banner from '@components/Banner';
import { getAllProduct } from '@apis/productApi';
import { Product } from 'models/ProductModel';
import type { GetServerSideProps } from 'next';
import ShowListProduct from '@components/Product/ShowListProduct';

interface ListProductProps {
  listProduct: Product[];
}

export default function Home({ listProduct }: ListProductProps) {
  return (
    <main className="max-w-screen-2xl mx-auto">
      <Banner />
      <div className="mx-auto w-[80%]">
        <ShowListProduct listProduct={listProduct} />
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listProduct: Product[] = await getAllProduct().then((response) => response.data);
  return {
    props: {
      listProduct,
    },
  };
};
