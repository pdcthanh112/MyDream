import { Product } from './ProductModel';

export interface Cart {
  id: string;
  name: string;
  customerId: string;
  status: string;
  createdDate: Date;
  checkoutDate: Date;
  cartItems: CartItem[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  status: string;
  cart?: string;
}

export interface CreateCartForm {
  name: string;
  customerId: string;
}

export interface AddToCartForm {
  productId: any;
  quantity: number;
  cartId: string;
}
export interface UpdateCartItemForm {
  quantity: number;
  itemId: string;
}
