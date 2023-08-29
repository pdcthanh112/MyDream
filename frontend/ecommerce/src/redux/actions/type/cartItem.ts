import * as actionName from '../name/cartItem';
import {
  AddItemToCartFailedPayload,
  AddItemToCartStartPayload,
  RemoveItemFromCartStartPayload,
  RemoveItemFromCartFailedPayload,
  AddItemToCartRequestedPayload,
  AddItemToCartSucceededPayload,
  RemoveItemFromCartSucceededPayload,
  RemoveItemFromCartRequestedPayload,
} from '../payload/cartItem';

export interface CartItemState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  data: {};
}

export type AddItemToCartRequested = {
  type: typeof actionName.ADD_ITEM_TO_CART_REQUESTED;
  payload: AddItemToCartRequestedPayload;
};

export type AddItemToCartStart = {
  type: typeof actionName.ADD_ITEM_TO_CART_START;
  payload: AddItemToCartStartPayload;
};

export type AddItemToCartSucceeded = {
  type: typeof actionName.ADD_ITEM_TO_CART_SUCCEEDED;
  payload: AddItemToCartSucceededPayload;
};

export type AddItemToCartFailed = {
  type: typeof actionName.ADD_ITEM_TO_CART_FAILED;
  payload: AddItemToCartFailedPayload;
};

export type RemoveItemFromCartRequested = {
  type: typeof actionName.REMOVE_ITEM_FROM_CART_REQUESTED;
  payload: RemoveItemFromCartRequestedPayload;
};

export type RemoveItemFromCartStart = {
  type: typeof actionName.REMOVE_ITEM_FROM_CART_START;
  payload: RemoveItemFromCartStartPayload;
};

export type RemoveItemFromCartSucceeded = {
  type: typeof actionName.REMOVE_ITEM_FROM_CART_SUCCEEDED;
  payload: RemoveItemFromCartSucceededPayload;
};

export type RemoveItemFromCartFailed = {
  type: typeof actionName.REMOVE_ITEM_FROM_CART_FAILED;
  payload: RemoveItemFromCartFailedPayload;
};
