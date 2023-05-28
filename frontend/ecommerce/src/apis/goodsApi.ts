import axiosConfig from '@config/axiosConfig';

export const getAllGoods = async (pageNo: number, pageSize: number) => {
  return await axiosConfig
    .get(`goods/getAll?pageNo=${pageNo}&pageSize=${pageSize}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getGoodsById = async (goodsId: string) => {

  
  return await axiosConfig
    // .get(`http://localhost:5000/ecommerce/goods/15b025fc-84e0-4f91-b921-f706bdebc63b`)
    .get(`goods/${goodsId}`)
    .then((response) =>   console.log('RRRRRRRRRRRR',response))
    .catch((error) => {
      // throw error;
      console.log('MMMM',error)
    });
};
