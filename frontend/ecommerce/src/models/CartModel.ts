import { CartItem } from "./CartItemModel";

export interface Cart {
  id: string;
  name:string;
  customerId: string;
  status: string;
  createdDate: Date;
  checkoutDate: Date;
  cartItems: CartItem[];
}

export interface CreateCartForm {
  name:string;
  customerId: string;
}