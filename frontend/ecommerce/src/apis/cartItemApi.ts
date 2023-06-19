import axiosConfig from '@config/axiosConfig';

export const addToCart = async (productId: string, quantity: number, cartId: string) => {
  return await axiosConfig
    .post(`cart-item/addToCart?productId=${productId}&quantity=${quantity}&cartId=${cartId}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  return await axiosConfig
    .put(`cart-item/update?cartItemId=${cartItemId}&quantity=${quantity}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};


export const deleteCartItem = async (itemId: string) => {
  return await axiosConfig
    .delete(`cart-item/${itemId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
