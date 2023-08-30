import { put, takeEvery } from 'redux-saga/effects';
import * as actionName from '../actions/name/cartItem';
import { PayloadAction } from '@reduxjs/toolkit';
import { addItemToCartFailed, addItemToCartStart, addItemToCartSucceeded, removeItemFromCartFailed, removeItemFromCartStart, removeItemFromCartSucceeded } from '@redux/reducers/cartItemReducer';

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


export function* cartItemSaga() {
  yield takeEvery(actionName.ADD_ITEM_TO_CART_REQUESTED, addToCart);
  yield takeEvery(actionName.REMOVE_ITEM_FROM_CART_REQUESTED, removeFromCart);
};
