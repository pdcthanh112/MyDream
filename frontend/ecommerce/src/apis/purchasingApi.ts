import axiosConfig from '@config/axiosConfig';

export const getHistoryByCustomer = async (customerId: string) => {
  return await axiosConfig
    .get(`purchasing/history?customerId=${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
