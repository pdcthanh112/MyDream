import axiosConfig from '@config/axiosConfig';
import { PaginationParams } from '@models/Request';

export const getStoreById = async (id: any) => {
  return await axiosConfig
    .get(`store/getById/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// export const getProductFromStore = async (id: any, pagination: PaginationParams) => {
export const getProductFromStore = async (id: any, page: number, limit: number) => {
  return await axiosConfig
    .get(`store/getProductFromStore?store=${id}&page=${page}&limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
