import * as actionName from './name/cart';
import {
  CreateNewCartFailedPayload,
  CreateNewCartRequestedPayload,
  CreateNewCartStartPayload,
  CreateNewCartSucceededPayload,
  DeleteCartFailedPayload,
  DeleteCartRequestedPayload,
  DeleteCartStartPayload,
  DeleteCartSucceededPayload,
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
