import { AddToCartFailed, AddToCartStart, AddToCartSuccess, CreateNewCartFailed, CreateNewCartStart, CreateNewCartSuccess } from './type/cart';
import * as actionName from './name/cart';
import {
  AddToCartFailedPayload,
  AddToCartStartPayload,
  AddToCartSuccessPayload,
  CreateNewCartFailedPayload,
  CreateNewCartStartPayload,
  CreateNewCartSuccessPayload,
} from './payload/cart';

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

export const addToCartStart = (payload: AddToCartStartPayload): AddToCartStart => ({
  type: actionName.ADD_ITEM_TO_CART_START,
  payload,
});

export const addToCartSuccess = (payload: AddToCartSuccessPayload): AddToCartSuccess => ({
  type: actionName.ADD_ITEM_TO_CART_SUCCESS,
  payload,
});

export const addToCartFailed = (payload: AddToCartFailedPayload): AddToCartFailed => ({
  type: actionName.ADD_ITEM_TO_CART_FAILED,
  payload,
});
