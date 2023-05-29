import axiosConfig from '@config/axiosConfig';

export const getAllCategory = async (pageNo: number, pageSize: number) => {
  return await axiosConfig
    .get(`category/getAll?pageNo=${pageNo}&pageSize=${pageSize}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};