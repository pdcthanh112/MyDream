interface Product {
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
  status: string;
  slug: string;
  store: string;
}

interface ProductAttribute {
  id: number;
  name: string;
}

interface AttributeValue {
  id: number;
  attribute: ProductAttribute;
  product: string;
  value: string;
}

interface ProductImage {
  id: number;
  product: string;
  imagePath: string;
  alt: string;
  isDefault: boolean;
}
