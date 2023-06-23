import axiosConfig from '@config/axiosConfig';
import { CreateCartForm } from 'models/CartModel';

export const createNewCart = async (data: CreateCartForm) => {
  return await axiosConfig
    .post('cart/create', {
      name: data.name,
      customerId: data.customerId,
    })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const getCartById = async (customerId: string) => {
  return await axiosConfig
    .get(`cart/getByCustomer?customerId=${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getCartByCustomerId = async (customerId: string) => {
  return await axiosConfig
    .get(`cart/getByCustomer?customerId=${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
