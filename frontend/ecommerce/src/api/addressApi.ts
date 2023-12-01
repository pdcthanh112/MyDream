import axiosConfig from '@config/axiosConfig';
import { CreateAddressForm, UpdateAddressForm } from '@models/AddressModel';

export const getAddressById = async (addressId: string) => {
  return await axiosConfig
    .get(`address/${addressId}`)
    .then((response) => response.data)
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
      customer: data.customer,
      phone: data.phone,
      country: data.country,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      addressLine3: data.addressLine3,
      street: data.street,
      postalCode: data.postalCode,
      idDefault: data.isDefault,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateAddress = async (addressId: string, data: UpdateAddressForm) => {
  return await axiosConfig
    .put(`address/update/${addressId}`, {
      phone: data.phone,
      country: data.country,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      addressLine3: data.addressLine3,
      street: data.street,
      postalCode: data.postalCode,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getDefaultAddressOfCustomer = async (customerId: string) => {
  return await axiosConfig
    .get(`address/getDefaultAddress?customer=${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
