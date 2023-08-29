import { Wishlist } from '@models/WishlistModel';
import * as actionName from '../name/wishlist';
import {
  AddItemToWishlistFailedPayload,
  AddItemToWishlistRequestedPayload,
  AddItemToWishlistStartPayload,
  AddItemToWishlistSucceededPayload,
  FetchWishlistFailedPayload,
  FetchWishlistRequestedPayload,
  FetchWishlistStartPayload,
  FetchWishlistSucceededPayload,
  RemoveItemFromWishlistFailedPayload,
  RemoveItemFromWishlistRequestedPayload,
  RemoveItemFromWishlistStartPayload,
  RemoveItemFromWishlistSucceededPayload,
} from '../payload/wishlist';

export interface WishlistState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null;
  data: Wishlist[];
}

export type FetchWishlistRequested = {
  type: typeof actionName.FETCH_WISHLIST_REQUESTED;
  payload: FetchWishlistRequestedPayload;
};

export type FetchWishlistStart = {
  type: typeof actionName.FETCH_WISHLIST_START;
  payload: FetchWishlistStartPayload;
};

export type FetchWishlistSucceeded = {
  type: typeof actionName.FETCH_WISHLIST_SUCCEEDED;
  payload: FetchWishlistSucceededPayload;
};

export type FetchWishlistFailed = {
  type: typeof actionName.FETCH_WISHLIST_FAILED;
  payload: FetchWishlistFailedPayload;
};

export type AddItemToWishlistRequested = {
  type: typeof actionName.ADD_ITEM_TO_WISHLIST_REQUESTED;
  payload: AddItemToWishlistRequestedPayload;
};

export type AddItemToWishlistStart = {
  type: typeof actionName.ADD_ITEM_TO_WISHLIST_START;
  payload: AddItemToWishlistStartPayload;
};

export type AddItemToWishlistSucceeded = {
  type: typeof actionName.ADD_ITEM_TO_WISHLIST_SUCCEEDED;
  payload: AddItemToWishlistSucceededPayload;
};

export type AddItemToWishlistFailed = {
  type: typeof actionName.ADD_ITEM_TO_WISHLIST_FAILED;
  payload: AddItemToWishlistFailedPayload;
};

export type RemoveItemFromWishlistRequested = {
  type: typeof actionName.REMOVE_ITEM_FROM_WISHLIST_REQUESTED;
  payload: RemoveItemFromWishlistRequestedPayload;
};

export type RemoveItemFromWishlistStart = {
  type: typeof actionName.REMOVE_ITEM_FROM_WISHLIST_START;
  payload: RemoveItemFromWishlistStartPayload;
};

export type RemoveItemFromWishlistSucceeded = {
  type: typeof actionName.REMOVE_ITEM_FROM_WISHLIST_SUCCEEDED;
  payload: RemoveItemFromWishlistSucceededPayload;
};

export type RemoveItemFromWishlistFailed = {
  type: typeof actionName.REMOVE_ITEM_FROM_WISHLIST_FAILED;
  payload: RemoveItemFromWishlistFailedPayload;
};
