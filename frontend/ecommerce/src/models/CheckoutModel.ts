import { Cart } from "./CartModel";

export interface CheckoutForm {
  customer: string
  address: string;
  phone: string;
  total: number;
  paymentMethod: string;
  checkoutDate: Date;
  cart: Cart | string;
  voucher: string;
  note?: string
}
