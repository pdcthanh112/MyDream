import axiosConfig from '@config/axiosConfig';
import { CheckoutForm } from '@models/CheckoutModel';

export const checkout = async (data: CheckoutForm) => {
  return await axiosConfig
    .post('/', {
        customer: data.customer,
        cartId: data.cart,
        total: data.total,
        voucher: data.voucher,
        address: data.address,
        phone: data.phone,
        payment: data.paymentMethod,
        note: data.note
    })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
