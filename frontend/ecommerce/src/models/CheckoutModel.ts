import { Cart } from "./CartModel";

export interface CheckoutForm {
  customer: string
  address: string;
  phone: string;
  total: number;
  payment: string;
  cart: Cart | string;
  voucher?: string;
}
