import Banner from '@components/Banner';
import ProductFeed from '@components/Product/ProductFeed';
import { getAllProduct } from '@apis/productApi';
import { Product } from '@model/ProductModel';
import type { GetServerSideProps } from 'next';

export default function Home({ product }: any) {

  return (
    <main className="max-w-screen-2xl mx-auto">
      <Banner />
      <ProductFeed product={product} />
    </main>
  );
}

// export async function getServerSideProps(): GetServerSideProps {
export const getServerSideProps: GetServerSideProps = async (context) => {
  const product: Product[] = await getAllProduct().then((res) => res);
  return {
    props: {
      product,
    },
  };
};
