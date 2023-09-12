import { Wishlist } from "@models/WishlistModel";

export interface FetchWishlistRequestedPayload {
  customerId: string;
}

export interface FetchWishlistStartPayload {
  params: { token: string };
}

export interface FetchWishlistSucceededPayload {
  data: Wishlist;
}

export interface FetchWishlistFailedPayload {
  error: string;
}

export interface AddItemToWishlistRequestedPayload {
  params: { customerId: string; productId: string };
}

export interface AddItemToWishlistStartPayload {
  params: { customerId: string; productId: string };
}

export interface AddItemToWishlistSucceededPayload {
  data: Wishlist;
}

export interface AddItemToWishlistFailedPayload {
  error: string;
}

export interface AddItemToWishlistCleanPayload {
  data: string;
}

export interface RemoveItemFromWishlistRequestedPayload {
  params: { customerId: string; productId: string };
}

export interface RemoveItemFromWishlistStartPayload {
  params: { customerId: string; productId: string };
}

export interface RemoveItemFromWishlistSucceededPayload {
  data: Wishlist;
}

export interface RemoveItemFromWishlistFailedPayload {
  error: string;
}

export interface RemoveItemFromWishlistCleanPayload {
  data: string;
}
