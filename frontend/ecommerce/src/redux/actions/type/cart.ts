import * as actionName from '@redux/actions/name/cart';
import {
  AddToCartFailedPayload,
  AddToCartStartPayload,
  AddToCartSuccessPayload,
  CreateNewCartFailedPayload,
  CreateNewCartStartPayload,
  CreateNewCartSuccessPayload,
  DeleteCartFailedPayload,
  DeleteCartStartPayload,
  DeleteCartSuccessPayload,
} from '../payload/cart';

export interface CartState {
  pending: boolean;
  success: boolean;
  error: string | null;
}

export type CreateNewCartStart = {
  type: typeof actionName.CREATE_NEW_CART_START;
  payload: CreateNewCartStartPayload;
};

export type CreateNewCartSuccess = {
  type: typeof actionName.CREATE_NEW_CART_SUCCESS;
  payload: CreateNewCartSuccessPayload;
};

export type CreateNewCartFailed = {
  type: typeof actionName.CREATE_NEW_CART_FAILED;
  payload: CreateNewCartFailedPayload;
};
export type DeleteCartStart = {
  type: typeof actionName.DELETE_CART_START;
  payload: DeleteCartStartPayload;
};

export type DeleteCartSuccess = {
  type: typeof actionName.DELETE_CART_SUCCESS;
  payload: DeleteCartSuccessPayload;
};

export type DeleteCartFailed = {
  type: typeof actionName.DELETE_CART_FAILED;
  payload: DeleteCartFailedPayload;
};
// add to cart
export type AddToCartStart = {
  type: typeof actionName.ADD_ITEM_TO_CART_START;
  payload: AddToCartStartPayload;
};

export type AddToCartSuccess = {
  type: typeof actionName.ADD_ITEM_TO_CART_SUCCESS;
  payload: AddToCartSuccessPayload;
};

export type AddToCartFailed = {
  type: typeof actionName.ADD_ITEM_TO_CART_FAILED;
  payload: AddToCartFailedPayload;
};

export type CartAction =
  | CreateNewCartStart
  | CreateNewCartSuccess
  | CreateNewCartFailed
  | DeleteCartStart
  | DeleteCartSuccess
  | DeleteCartFailed
  | AddToCartStart
  | AddToCartSuccess
  | AddToCartFailed;
