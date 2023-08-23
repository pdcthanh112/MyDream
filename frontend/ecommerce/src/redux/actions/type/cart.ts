import * as actionName from '../name/cart';
import {
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
  data: {};
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
