export type Address = {
  id: string;
  customer: string;
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  street: string;
  postalCode: string;
  isDefault: boolean;
};

export type CreateAddressForm = {
  customer: string;
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  street: string;
  postalCode: string;
  isDefault: boolean
};

export type UpdateAddressForm = {
  id: string
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  street: string;
  postalCode: string;
};