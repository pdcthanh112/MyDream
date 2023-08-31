import { put, takeEvery } from 'redux-saga/effects';
import * as actionName from '../actions/name/cart';
import { PayloadAction } from '@reduxjs/toolkit';
import { addItemToCartFailed, addItemToCartStart, addItemToCartSucceeded, createNewCartFailed, createNewCartStart, createNewCartSucceeded, deleteCartFailed, deleteCartStart, deleteCartSucceeded, removeItemFromCartFailed, removeItemFromCartStart, removeItemFromCartSucceeded } from '@redux/reducers/cartReducer';

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

function* addToCart(action: PayloadAction<any>) {
  try {
    yield put(addItemToCartStart(action.payload));

    yield put(addItemToCartSucceeded(action.payload));  
  } catch (e) {
    yield put(addItemToCartFailed(action.payload));  
  }
}

function* removeFromCart(action: PayloadAction<any>) {
  try {
    yield put(removeItemFromCartStart(action.payload));
    // yield Api.removeCartItem(action.payload);
    yield put(removeItemFromCartSucceeded(action.payload));
  } catch (e) {
    yield put(removeItemFromCartFailed(action.payload));
  }
}


export function* cartSaga() {
  yield takeEvery(actionName.CREATE_NEW_CART_REQUESTED, createNewCart);
  yield takeEvery(actionName.DELETE_CART_REQUESTED, deleteCart);
  yield takeEvery(actionName.ADD_ITEM_TO_CART_REQUESTED, addToCart);
  yield takeEvery(actionName.REMOVE_ITEM_FROM_CART_REQUESTED, removeFromCart);
};
