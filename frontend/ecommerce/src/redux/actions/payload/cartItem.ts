export interface AddItemToCartRequestedPayload {
  values: { productId: string; quantity: number; cartId: string };
}

export interface AddItemToCartStartPayload {
  values: { productId: string; quantity: number; cartId: string };
}

export interface AddItemToCartSucceededPayload {
  data: {};
}

export interface AddItemToCartFailedPayload {
  error: string;
}

export interface RemoveItemFromCartRequestedPayload {
  values: { productId: string; cartId: string };
}

export interface RemoveItemFromCartStartPayload {
  values: { productId: string; cartId: string };
}

export interface RemoveItemFromCartSucceededPayload {
  token: string;
}

export interface RemoveItemFromCartFailedPayload {
  error: string;
}
