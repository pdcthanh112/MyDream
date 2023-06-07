import { Product } from '@model/ProductModel';

export interface CartItemType {
  id: string;
  product: Product;
  quantity: number;
  status: string;
}
