import * as actionName from './name/cart';
import {
  CreateNewCartFailedPayload,
  CreateNewCartStartPayload,
  CreateNewCartSuccessPayload,
  DeleteCartFailedPayload,
  DeleteCartStartPayload,
  DeleteCartSuccessPayload,
} from './payload/cart';
import { CreateNewCartStart, CreateNewCartSuccess, CreateNewCartFailed, DeleteCartStart, DeleteCartSuccess, DeleteCartFailed } from './type/cart';

export const createNewCartStart = (payload: CreateNewCartStartPayload): CreateNewCartStart => ({
  type: actionName.CREATE_NEW_CART_START,
  payload,
});

export const createNewCartSuccess = (payload: CreateNewCartSuccessPayload): CreateNewCartSuccess => ({
  type: actionName.CREATE_NEW_CART_SUCCESS,
  payload,
});

export const createNewCartFailed = (payload: CreateNewCartFailedPayload): CreateNewCartFailed => ({
  type: actionName.CREATE_NEW_CART_FAILED,
  payload,
});

export const deleteCartStart = (payload: DeleteCartStartPayload): DeleteCartStart => ({
  type: actionName.DELETE_CART_START,
  payload,
});

export const deleteCartSuccess = (payload: DeleteCartSuccessPayload): DeleteCartSuccess => ({
  type: actionName.DELETE_CART_SUCCESS,
  payload,
});

export const deleteCartFailed = (payload: DeleteCartFailedPayload): DeleteCartFailed => ({
  type: actionName.DELETE_CART_FAILED,
  payload,
});
