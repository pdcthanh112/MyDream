type Cart = {
  id: string;
  name: string;
  customerId: string;
  status: string;
  createdDate: Date;
  checkoutDate: Date;
  cartItems: CartItem[];
}

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  status: string;
  cart?: string;
}

type CreateCartForm = {
  name: string;
  customer: string;
  isDefault: boolean
}

type AddToCartForm = {
  productId: any;
  quantity: number;
  cartId: string;
}
type UpdateCartItemForm = {
  quantity: number;
  itemId: string;
}
