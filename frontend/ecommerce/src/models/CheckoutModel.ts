import { Cart } from "./CartModel";

export interface Checkout {
  customer: string
  address: string;
  phone: string;
  total: number;
  payment: string;
  cart: Cart | string;
  voucher?: string;
}

export interface CheckoutForm {
  customer: string
  address: string;
  phone: string;
  total: number;
  payment: string;
  cart: Cart | string;
  voucher?: string;
}
