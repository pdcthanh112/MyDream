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
};

export type UpdateAddressForm = {
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  street: string;
  postalCode: string;
};
