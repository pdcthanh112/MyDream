import { Rating } from "./RatingModel";

export interface ProductType {
  id: string;
  name: string;
  category: number;
  subcategory: number;
  description: string;
  quantity: number;
  price: number;
  production: string;
  sold: number;
  image: string;
  rating: Rating;
  status: string;
}
