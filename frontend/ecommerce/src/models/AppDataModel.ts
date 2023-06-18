export interface AppData {
  category: Category[];
  subcategory: Subcategory[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
  category?: Category;
}
