import type { NextPageWithLayout } from 'app/page';
import { getHistoryByCustomer } from '@apis/purchasingApi';
import { useAppSelector } from '@redux/store';
import { useQuery } from '@tanstack/react-query';
import { RootLayout } from 'app/layout';
import { CheckoutForm } from 'models/CheckoutModel';
import { Customer } from 'models/CustomerModel';
import { ReactElement } from 'react';

const History: NextPageWithLayout= () => {
  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);

  const { data: listCheckout, isLoading } = useQuery(['history'], async () => await getHistoryByCustomer(currentUser.userData.accountId).then((response) => response.data));

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className='mx-auto my-3'>
          <menu className='flex bg-white h-fit px-4 py-3'>
            <li className='px-10 py-3'>All</li>
            <li className='px-10 py-3'>Waiting to Pay</li>
            <li className='px-10 py-3'>Shipping</li>
            <li className='px-10 py-3'>Receiving</li>
            <li className='px-10 py-3'>Completed</li>
            <li className='px-10 py-3'>Canceled</li>
            <li className='px-10 py-3'>Return/Refund</li>
          </menu>

          {listCheckout.map((item: CheckoutForm) => (
            <>{item.checkoutDate}</>
          ))}
        </div>
      )}
    </>
  );
}

History.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default History;
