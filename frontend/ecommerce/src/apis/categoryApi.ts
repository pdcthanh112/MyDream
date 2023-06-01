import axiosConfig from '@config/axiosConfig';

export const getAllCategory = async (page: number, limit: number) => {
  return await axiosConfig
    .get(`category/getAll?page=${page}&limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};