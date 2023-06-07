import axiosConfig from '@config/axiosConfig';

export const getCartByCustomerId = async (customerId: string) => {
  return await axiosConfig
    .get(`cart/getByCustomer?customerId=${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
