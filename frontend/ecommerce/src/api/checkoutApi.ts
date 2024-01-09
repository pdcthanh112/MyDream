import axiosConfig from '@config/axiosConfig';

export const checkout = async (data: CheckoutForm) => {
  return await axiosConfig
    .post('/checkout/', {
        customer: data.customer,
        cartId: data.cart,
        total: data.total,
        voucher: data.voucher,
        address: data.address,
        phone: data.phone,
        payment: data.payment,
    })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
