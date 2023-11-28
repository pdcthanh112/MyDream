import axiosConfig from '@config/axiosConfig';
import { CreateAddressForm, UpdateAddressForm } from '@models/AddressModel';

export const getAddressById = async (addressId: string) => {
  return await axiosConfig
    .get(`address/${addressId}`)
    .then((response) => {
      console.log('AAAAAAAAAAAAAAAAAAAAA', response)
      return response.data
    })
    .catch((error) => {
      throw error;
    });
};

export const getAddressByCustomer = async (customerId: string) => {
  return await axiosConfig
    .get(`address/getByCustomer?customer=${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const createAddress = async (data: CreateAddressForm) => {
  return await axiosConfig
    .post('address/create', {
      data,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateAddress = async (addressId: string, data: UpdateAddressForm) => {
  return await axiosConfig
    .put(`address/update/${addressId}`, {
      data,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
