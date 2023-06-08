import Banner from '@components/Banner';
import { getAllProduct } from '@apis/productApi';
import { ProductType } from '@model/ProductModel';
import type { GetServerSideProps } from 'next';
import ProductFeed from '@pages/Product/ProductFeed';

interface ListProductProps {
  listProduct: ProductType[]
}

export default function Home({ listProduct }: ListProductProps) {
 
  return (
    <main className="max-w-screen-2xl mx-auto">
      <Banner />
      <ProductFeed listProduct={listProduct} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listProduct: ProductType[] = await getAllProduct()
  .then(response => response.data);
  return {
    props: {
      listProduct,
    },
  };
};
