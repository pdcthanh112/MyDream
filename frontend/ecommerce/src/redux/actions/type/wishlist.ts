import * as actionName from '../name/wishlist';
import {
  AddItemToWishlistFailedPayload,
  AddItemToWishlistStartPayload,
  AddItemToWishlistSuccessPayload,
  FetchWishlistFailedPayload,
  FetchWishlistStartPayload,
  FetchWishlistSuccessPayload,
  RemoveItemFromWishlistFailedPayload,
  RemoveItemFromWishlistStartPayload,
  RemoveItemFromWishlistSuccessPayload,
} from '../payload/wishlist';

export interface WishlistState {
  pending: boolean;
  success: boolean;
  error: string | null;
  data: {};
}

export type FetchWishlistStart = {
  type: typeof actionName.FETCH_WISHLIST_START;
  payload: FetchWishlistStartPayload;
};

export type FetchWishlistSuccess = {
  type: typeof actionName.FETCH_WISHLIST_SUCCESS;
  payload: FetchWishlistSuccessPayload;
};

export type FetchWishlistFailed = {
  type: typeof actionName.FETCH_WISHLIST_FAILED;
  payload: FetchWishlistFailedPayload;
};

export type AddItemToWishlistStart = {
  type: typeof actionName.ADD_ITEM_TO_WISHLIST_START;
  payload: AddItemToWishlistStartPayload;
};

export type AddItemToWishlistSuccess = {
  type: typeof actionName.ADD_ITEM_TO_WISHLIST_SUCCESS;
  payload: AddItemToWishlistSuccessPayload;
};

export type AddItemToWishlistFailed = {
  type: typeof actionName.ADD_ITEM_TO_WISHLIST_FAILED;
  payload: AddItemToWishlistFailedPayload;
};

export type RemoveItemFromWishlistStart = {
  type: typeof actionName.REMOVE_ITEM_FROM_WISHLIST_START;
  payload: RemoveItemFromWishlistStartPayload;
};

export type RemoveItemFromWishlistSuccess = {
  type: typeof actionName.REMOVE_ITEM_FROM_WISHLIST_SUCCESS;
  payload: RemoveItemFromWishlistSuccessPayload;
};

export type RemoveItemFromWishlistFailed = {
  type: typeof actionName.REMOVE_ITEM_FROM_WISHLIST_FAILED;
  payload: RemoveItemFromWishlistFailedPayload;
};
