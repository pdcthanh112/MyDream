import * as actionName from '../name/cart';
import {
  CreateNewCartFailedPayload,
  CreateNewCartRequestedPayload,
  CreateNewCartStartPayload,
  CreateNewCartSucceededPayload,
  DeleteCartFailedPayload,
  DeleteCartRequestedPayload,
  DeleteCartStartPayload,
  DeleteCartSucceededPayload,
} from '../payload/cart';

export interface CartState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null;
  data: {};
}

export type CreateNewCartRequested = {
  type: typeof actionName.CREATE_NEW_CART_REQUESTED;
  payload: CreateNewCartRequestedPayload;
};

export type CreateNewCartStart = {
  type: typeof actionName.CREATE_NEW_CART_START;
  payload: CreateNewCartStartPayload;
};

export type CreateNewCartSucceeded = {
  type: typeof actionName.CREATE_NEW_CART_SUCCEEDED;
  payload: CreateNewCartSucceededPayload;
};

export type CreateNewCartFailed = {
  type: typeof actionName.CREATE_NEW_CART_FAILED;
  payload: CreateNewCartFailedPayload;
};

export type DeleteCartRequested = {
  type: typeof actionName.DELETE_CART_REQUESTED;
  payload: DeleteCartRequestedPayload;
};

export type DeleteCartStart = {
  type: typeof actionName.DELETE_CART_START;
  payload: DeleteCartStartPayload;
};

export type DeleteCartSucceeded = {
  type: typeof actionName.DELETE_CART_SUCCEEDED;
  payload: DeleteCartSucceededPayload;
};

export type DeleteCartFailed = {
  type: typeof actionName.DELETE_CART_FAILED;
  payload: DeleteCartFailedPayload;
};
