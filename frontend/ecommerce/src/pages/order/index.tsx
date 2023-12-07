
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Order = () => {
  return (
    <div>Order</div>
  )
}

export default Order

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}