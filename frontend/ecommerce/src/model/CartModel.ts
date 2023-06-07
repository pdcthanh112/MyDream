import { CartItemType } from "./CartItemModel";

export interface Cart {
  id: string;
  customerId: string;
  status: string;
  createdDate: Date;
  checkoutDate: Date;
  cartItems: CartItemType[];
}
