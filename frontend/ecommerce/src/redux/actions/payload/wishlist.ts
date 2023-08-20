export interface FetchWishlistStartPayload {
  params: { id: string };
}

export interface FetchWishlistSuccessPayload {
  data: {};
}

export interface FetchWishlistFailedPayload {
  error: string;
}

export interface AddItemToWishlistStartPayload {
  params: { customerId: string; productId: string };
}

export interface AddItemToWishlistSuccessPayload {
  data: {};
}

export interface AddItemToWishlistFailedPayload {
  error: string;
}

export interface RemoveItemFromWishlistStartPayload {
  params: { customerId: string; productId: string };
}

export interface RemoveItemFromWishlistSuccessPayload {
  data: {};
}

export interface RemoveItemFromWishlistFailedPayload {
  error: string;
}
