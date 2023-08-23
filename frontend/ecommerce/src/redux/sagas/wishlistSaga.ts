import { put, takeEvery } from 'redux-saga/effects';
import * as actionName from '../actions/name/wishlist';
import { addProductToWishlist, getWishlistByCustomer, removeProductFromWishlist } from '@apis/wishlistApi';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchWishlistByCustomer(action: PayloadAction<any>) {
  try {
    yield put({ type: actionName.FETCH_WISHLIST_START });
    yield getWishlistByCustomer(action.payload.customerId);
    yield put({ type: actionName.FETCH_WISHLIST_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.FETCH_WISHLIST_FAILED, payload: e });
  }
}

function* addItemToWishlist(action: PayloadAction<any>) {
  try {
    yield put({ type: actionName.FETCH_WISHLIST_START });
    yield addProductToWishlist(action.payload.customerId, action.payload.productId);
    yield put({ type: actionName.ADD_ITEM_TO_WISHLIST_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.ADD_ITEM_TO_WISHLIST_FAILED });
  }
}

function* removeItemFromWishlist(action: PayloadAction<any>) {
  try {
    yield put({ type: actionName.FETCH_WISHLIST_START });
    yield removeProductFromWishlist(action.payload.customerId, action.payload.productId);
    yield put({ type: actionName.REMOVE_ITEM_FROM_WISHLIST_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.REMOVE_ITEM_FROM_WISHLIST_FAILED });
  }
}

export function* wishlistSaga() {
  takeEvery(actionName.FETCH_WISHLIST, fetchWishlistByCustomer);
  takeEvery(actionName.ADD_ITEM_TO_WISHLIST, addItemToWishlist);
  takeEvery(actionName.REMOVE_ITEM_FROM_WISHLIST, removeItemFromWishlist);
};
