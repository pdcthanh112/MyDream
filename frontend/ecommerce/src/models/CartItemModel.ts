import { Product } from 'models/ProductModel';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  status: string;
  cart?:string
}
