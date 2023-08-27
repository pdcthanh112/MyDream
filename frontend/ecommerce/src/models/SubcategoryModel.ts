import { Category } from "./CategoryModel";

export interface Subcategory {
    id: number;
    name: string;
    category?: Category;
  }