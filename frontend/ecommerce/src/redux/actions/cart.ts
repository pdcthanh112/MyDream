import * as actionName from './name/cart';
import {
  AddItemToCartFailedPayload,
  AddItemToCartRequestedPayload,
  AddItemToCartStartPayload,
  AddItemToCartSucceededPayload,
  CreateNewCartFailedPayload,
  CreateNewCartRequestedPayload,
  CreateNewCartStartPayload,
  CreateNewCartSucceededPayload,
  DeleteCartFailedPayload,
  DeleteCartRequestedPayload,
  DeleteCartStartPayload,
  DeleteCartSucceededPayload,
  RemoveItemFromCartFailedPayload,
  RemoveItemFromCartRequestedPayload,
  RemoveItemFromCartStartPayload,
  RemoveItemFromCartSucceededPayload,
} from './payload/cart';
import {
  CreateNewCartStart,
  CreateNewCartFailed,
  DeleteCartStart,
  DeleteCartFailed,
  CreateNewCartRequested,
  CreateNewCartSucceeded,
  DeleteCartRequested,
  DeleteCartSucceeded,
  AddItemToCartFailed,
  AddItemToCartRequested,
  AddItemToCartStart,
  AddItemToCartSucceeded,
  RemoveItemFromCartFailed,
  RemoveItemFromCartRequested,
  RemoveItemFromCartStart,
  RemoveItemFromCartSucceeded,
} from './type/cart';

export const createNewCartRequested = (payload: CreateNewCartRequestedPayload): CreateNewCartRequested => ({
  type: actionName.CREATE_NEW_CART_REQUESTED,
  payload,
});

export const createNewCartStart = (payload: CreateNewCartStartPayload): CreateNewCartStart => ({
  type: actionName.CREATE_NEW_CART_START,
  payload,
});

export const createNewCartSucceeded = (payload: CreateNewCartSucceededPayload): CreateNewCartSucceeded => ({
  type: actionName.CREATE_NEW_CART_SUCCEEDED,
  payload,
});

export const createNewCartFailed = (payload: CreateNewCartFailedPayload): CreateNewCartFailed => ({
  type: actionName.CREATE_NEW_CART_FAILED,
  payload,
});

export const deleteCartRequested = (payload: DeleteCartRequestedPayload): DeleteCartRequested => ({
  type: actionName.DELETE_CART_REQUESTED,
  payload,
});

export const deleteCartStart = (payload: DeleteCartStartPayload): DeleteCartStart => ({
  type: actionName.DELETE_CART_START,
  payload,
});

export const deleteCartSuccess = (payload: DeleteCartSucceededPayload): DeleteCartSucceeded => ({
  type: actionName.DELETE_CART_SUCCEEDED,
  payload,
});

export const deleteCartFailed = (payload: DeleteCartFailedPayload): DeleteCartFailed => ({
  type: actionName.DELETE_CART_FAILED,
  payload,
});

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

