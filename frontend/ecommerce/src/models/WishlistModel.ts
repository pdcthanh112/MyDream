import { Product } from "./ProductModel";

export interface Wishlist {
  id: string;
  custommer: string;
  product: Product[];
}
