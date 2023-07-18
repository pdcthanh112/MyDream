import axiosConfig from '@config/axiosConfig';

export const getNotificationByCustomer = async (customer: string) => {
  return await axiosConfig
    .get(`notification/getByCustomer?id=${customer}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
