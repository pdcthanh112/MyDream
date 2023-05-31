import axiosConfig from '@config/axiosConfig';

export const getAllProduct = async (pageNo?: number, pageSize?: number) => {
  const url = pageNo !== undefined && pageSize !== undefined
  ? `product/getAll?pageNo=${pageNo}&pageSize=${pageSize}`
  : 'product/getAll';
  return await axiosConfig
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductById = async (productId: any) => {
  return await axiosConfig
    .get(`product/${productId}`)
    .then((response) =>  response.data)
    .catch((error) => {    
      throw error;
    });
};
