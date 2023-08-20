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
} from './payload/wishlist';
import {
  AddItemToWishlistFailed,
  AddItemToWishlistStart,
  AddItemToWishlistSuccess,
  FetchWishlistFailed,
  FetchWishlistStart,
  FetchWishlistSuccess,
  RemoveItemFromWishlistFailed,
  RemoveItemFromWishlistStart,
  RemoveItemFromWishlistSuccess,
} from './type/wishlist';
import * as actionName from './name/wishlist';

export const fetchWishlistStart = (payload: FetchWishlistStartPayload): FetchWishlistStart => ({
  type: actionName.FETCH_WISHLIST_START,
  payload,
});

export const fetchWishlistSuccess = (payload: FetchWishlistSuccessPayload): FetchWishlistSuccess => ({
  type: actionName.FETCH_WISHLIST_SUCCESS,
  payload,
});

export const fetchWishlistFailed = (payload: FetchWishlistFailedPayload): FetchWishlistFailed => ({
  type: actionName.FETCH_WISHLIST_FAILED,
  payload,
});

export const addItemToWishlistStart = (payload: AddItemToWishlistStartPayload): AddItemToWishlistStart => ({
  type: actionName.ADD_ITEM_TO_WISHLIST_START,
  payload,
});

export const addItemToWishlistSuccess = (payload: AddItemToWishlistSuccessPayload): AddItemToWishlistSuccess => ({
  type: actionName.ADD_ITEM_TO_WISHLIST_SUCCESS,
  payload,
});

export const addItemToWishlistFailed = (payload: AddItemToWishlistFailedPayload): AddItemToWishlistFailed => ({
  type: actionName.ADD_ITEM_TO_WISHLIST_FAILED,
  payload,
});

export const removeItemFromWishlistStart = (payload: RemoveItemFromWishlistStartPayload): RemoveItemFromWishlistStart => ({
  type: actionName.REMOVE_ITEM_FROM_WISHLIST_START,
  payload,
});

export const removeItemFromWishlistSuccess = (payload: RemoveItemFromWishlistSuccessPayload): RemoveItemFromWishlistSuccess => ({
  type: actionName.REMOVE_ITEM_FROM_WISHLIST_SUCCESS,
  payload,
});

export const removeItemFromWishlistFailed = (payload: RemoveItemFromWishlistFailedPayload): RemoveItemFromWishlistFailed => ({
  type: actionName.REMOVE_ITEM_FROM_WISHLIST_FAILED,
  payload,
});
