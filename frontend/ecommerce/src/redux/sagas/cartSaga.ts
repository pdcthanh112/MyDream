import { put, takeEvery } from 'redux-saga/effects';
import { addToCart as addToCartApi } from '@apis/cartItemApi';
import * as actionName from '../actions/name/cart';
import { PayloadAction } from '@reduxjs/toolkit';
import { createNewCartFailed, createNewCartStart, createNewCartSucceeded, deleteCartFailed, deleteCartStart, deleteCartSucceeded } from '@redux/reducers/cartReducer';

function* createNewCart(action: PayloadAction<any>) {
  try {
    yield put(createNewCartStart(action.payload));
    // yield addToCartApi({ productId: action.payload.productId, quantity: action.payload.quantity, cartId: action.payload.cartId });
    yield put(createNewCartSucceeded(action.payload));
  } catch (e) {
    yield put(createNewCartFailed(action.payload));
  }
}

function* deleteCart(action: PayloadAction<any>) {
  try {
    yield put(deleteCartStart(action.payload));
    // yield removeCartItem(action.payload);
    yield put(deleteCartSucceeded(action.payload));
  } catch (e) {
    yield put(deleteCartFailed(action.payload));
  }
}


export function* cartSaga() {
  yield takeEvery(actionName.CREATE_NEW_CART_REQUESTED, createNewCart);
  yield takeEvery(actionName.DELETE_CART_REQUESTED, deleteCart);
};
