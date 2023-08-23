export interface AddItemToCartStartPayload {
  values: { productId: string; quantity: number; cartId: string };
}

export interface AddItemToCartSuccessPayload {
  data: {};
}

export interface AddItemToCartFailedPayload {
  error: string;
}

export interface RemoveItemFromCartStartPayload {
  values: { productId: string; cartId: string };
}

export interface RemoveItemFromCartSuccessPayload {
  token: string;
}

export interface RemoveItemFromCartFailedPayload {
  error: string;
}
