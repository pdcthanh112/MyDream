import { Wishlist } from "@models/WishlistModel";

// ================= FETCH WISHLIST =================
export interface FetchWishlistRequestedPayload {
  params: any;
}

export interface FetchWishlistStartPayload {
  params: { token: string };
}

export interface FetchWishlistSucceededPayload {
  data: Wishlist[];
}

export interface FetchWishlistFailedPayload {
  error: string;
}

// ================= ADD ITEM TO WISHLIST =====================
export interface AddItemToWishlistRequestedPayload {
  params: { customerId: string; productId: string };
}

export interface AddItemToWishlistStartPayload {
  params: { customerId: string; productId: string };
}

export interface AddItemToWishlistSucceededPayload {
  data: {};
}

export interface AddItemToWishlistFailedPayload {
  error: string;
}

// ================== REMOVE ITEM FROM WISHLIST ====================
export interface RemoveItemFromWishlistRequestedPayload {
  params: { customerId: string; productId: string };
}

export interface RemoveItemFromWishlistStartPayload {
  params: { customerId: string; productId: string };
}

export interface RemoveItemFromWishlistSucceededPayload {
  data: {};
}

export interface RemoveItemFromWishlistFailedPayload {
  error: string;
}
