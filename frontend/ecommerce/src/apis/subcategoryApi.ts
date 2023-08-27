import axiosConfig from '@config/axiosConfig';

export const getAllSubategory = async (page?: number, limit?: number) => {
  return await axiosConfig
    .get(`subcategory/getAll?page=${page}&limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};