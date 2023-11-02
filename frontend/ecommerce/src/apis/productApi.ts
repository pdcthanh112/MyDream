import axiosConfig from '@config/axiosConfig';

export const getAllProduct = async (page?: number, limit?: number) => {
  const url = page !== undefined && limit !== undefined ? `product/getAll?page=${page}&limit=${limit}` : 'product/getAll';
  return await axiosConfig
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductById = async (productId: any) => {
  return await axiosConfig
    .get(`product/getById/${productId}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const getProductBySlug = async (productSlug: any) => {
  return await axiosConfig
    .get(`product/getBySlug/${productSlug}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const getProductBySubcategory = async (subcategoryId: any, page: number, limit: number) => {
  return await axiosConfig
    .get(`product/getBySubcategory?subcategory=${subcategoryId}&page=${page}&limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
