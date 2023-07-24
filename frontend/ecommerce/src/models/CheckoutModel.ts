import { Cart } from "./CartModel";

export interface CheckoutForm {
  id?: string;
  name: string;
  address: string;
  phone: string;
  total: number;
  paymentMethod: string;
  checkoutDate: Date;
  cart: Cart | string;
}
