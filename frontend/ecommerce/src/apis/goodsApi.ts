import axiosConfig from '@config/axiosConfig';

export const getAllGoods = async (pageNo: number, pageSize: number) => {
  return await axiosConfig
    .get(`goods/getAll?pageNo=${pageNo}&pageSize=${pageSize}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getGoodsById = async (goodsId: any) => {
  return await axiosConfig
    .get(`goods/${goodsId}`)
    .then((response) =>  response.data)
    .catch((error) => {
      // throw error;
      console.log('EEEEEEEEE',error)
    });
};
