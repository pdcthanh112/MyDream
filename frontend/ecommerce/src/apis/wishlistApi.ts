import axiosConfig from '@config/axiosConfig';

export const addToWishlist = async (customerId: string, productId: string) => {
  return await axiosConfig
    .post(`wishlist/add?customerId=${customerId}&productId=${productId}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const getWishlistByCustomer = async (customerId: string) => {
  return await axiosConfig
    .get(`wishlist/getByCustomer?customerId=${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
