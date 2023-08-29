import * as actionName from './name/cartItem';

import {
  AddItemToCartFailedPayload,
  AddItemToCartRequestedPayload,
  AddItemToCartStartPayload,
  AddItemToCartSucceededPayload,
  RemoveItemFromCartFailedPayload,
  RemoveItemFromCartRequestedPayload,
  RemoveItemFromCartStartPayload,
  RemoveItemFromCartSucceededPayload,
} from './payload/cartItem';
import {
  AddItemToCartFailed,
  AddItemToCartRequested,
  AddItemToCartStart,
  AddItemToCartSucceeded,
  RemoveItemFromCartFailed,
  RemoveItemFromCartRequested,
  RemoveItemFromCartStart,
  RemoveItemFromCartSucceeded,
} from './type/cartItem';

export const addItemToCartRequested = (payload: AddItemToCartRequestedPayload): AddItemToCartRequested => ({
  type: actionName.ADD_ITEM_TO_CART_REQUESTED,
  payload,
});

export const addItemToCartStart = (payload: AddItemToCartStartPayload): AddItemToCartStart => ({
  type: actionName.ADD_ITEM_TO_CART_START,
  payload,
});

export const addItemToCartSucceeded = (payload: AddItemToCartSucceededPayload): AddItemToCartSucceeded => ({
  type: actionName.ADD_ITEM_TO_CART_SUCCEEDED,
  payload,
});

export const addItemToCartFailed = (payload: AddItemToCartFailedPayload): AddItemToCartFailed => ({
  type: actionName.ADD_ITEM_TO_CART_FAILED,
  payload,
});

export const removeItemFromCartRequested = (payload: RemoveItemFromCartRequestedPayload): RemoveItemFromCartRequested => ({
  type: actionName.REMOVE_ITEM_FROM_CART_REQUESTED,
  payload,
});

export const removeItemFromCartStart = (payload: RemoveItemFromCartStartPayload): RemoveItemFromCartStart => ({
  type: actionName.REMOVE_ITEM_FROM_CART_START,
  payload,
});

export const removeItemFromCartSucceeded = (payload: RemoveItemFromCartSucceededPayload): RemoveItemFromCartSucceeded => ({
  type: actionName.REMOVE_ITEM_FROM_CART_SUCCEEDED,
  payload,
});

export const removeItemFromCartFailed = (payload: RemoveItemFromCartFailedPayload): RemoveItemFromCartFailed => ({
  type: actionName.REMOVE_ITEM_FROM_CART_FAILED,
  payload,
});
