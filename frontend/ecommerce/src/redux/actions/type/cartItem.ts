import * as actionName from '../name/cartItem';
import {
  AddItemToCartFailedPayload,
  AddItemToCartStartPayload,
  AddItemToCartSuccessPayload,
  RemoveItemFromCartStartPayload,
  RemoveItemFromCartSuccessPayload,
  RemoveItemFromCartFailedPayload,
} from '../payload/cartItem';

export interface CartItemState {
  pending: boolean;
  success: boolean;
  error: string | null;
  data: {};
}

export type AddItemToCartStart = {
  type: typeof actionName.ADD_ITEM_TO_CART_START;
  payload: AddItemToCartStartPayload;
};

export type AddItemToCartSuccess = {
  type: typeof actionName.ADD_ITEM_TO_CART_SUCCESS;
  payload: AddItemToCartSuccessPayload;
};

export type AddItemToCartFailed = {
  type: typeof actionName.ADD_ITEM_TO_CART_FAILED;
  payload: AddItemToCartFailedPayload;
};

export type RemoveItemFromCartStart = {
  type: typeof actionName.REMOVE_ITEM_FROM_CART_START;
  payload: RemoveItemFromCartStartPayload;
};

export type RemoveItemFromCartSuccess = {
  type: typeof actionName.REMOVE_ITEM_FROM_CART_SUCCESS;
  payload: RemoveItemFromCartSuccessPayload;
};

export type RemoveItemFromCartFailed = {
  type: typeof actionName.REMOVE_ITEM_FROM_CART_FAILED;
  payload: RemoveItemFromCartFailedPayload;
};
