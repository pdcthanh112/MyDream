import axiosConfig from '@config/axiosConfig';

export const deleteCartItem = async (itemId: string) => {
  return await axiosConfig
    .delete(`cart-item/${itemId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
