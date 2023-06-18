import Banner from '@components/Banner';
import { getAllProduct } from '@apis/productApi';
import { Product } from '@model/ProductModel';
import type { GetServerSideProps } from 'next';
import ProductFeed from '@pages/product/ProductFeed';

interface ListProductProps {
  listProduct: Product[]
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
  const listProduct: Product[] = await getAllProduct()
  .then(response => response.data);
  return {
    props: {
      listProduct,
    },
  };
};
