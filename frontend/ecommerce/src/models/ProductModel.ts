export interface Product {
  id: string;
  name: string;
  category: number;
  subcategory: number;
  description: string;
  SKU: string;
  quantity: number;
  price: number;
  production: string;
  sold: number;
  image: string;
  status: string;
  slug: string;
  store: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
}

export interface AttributeValue {
  id: number;
  attribute: ProductAttribute;
  product: string;
  value: string;
}

export interface ProductImage {
  id: number;
  product: string;
  imagePath: string;
  alt: string;
  isDefault: boolean;
}
