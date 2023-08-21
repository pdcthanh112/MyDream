import { put, takeEvery } from 'redux-saga/effects';
import * as actionName from '../actions/name/wishlist';
import { addProductToWishlist, getWishlistByCustomer, removeProductFromWishlist } from '@apis/wishlistApi';

function* fetchWishlistByCustomer(action: any) {
  try {
    yield put({ type: actionName.FETCH_WISHLIST_START });
    yield getWishlistByCustomer(action.customerId);
    yield put({ type: actionName.FETCH_WISHLIST_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.FETCH_WISHLIST_FAILED });
  }
}

function* addItemToWishlist(action: any) {
  try {
    yield put({ type: actionName.FETCH_WISHLIST_START });
    yield addProductToWishlist(action.customerId, action.productId);
    yield put({ type: actionName.ADD_ITEM_TO_WISHLIST_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.ADD_ITEM_TO_WISHLIST_FAILED });
  }
}

function* removeItemFromWishlist(action: any) {
  try {
    yield put({ type: actionName.FETCH_WISHLIST_START });
    yield removeProductFromWishlist(action.customerId, action.productId);
    yield put({ type: actionName.REMOVE_ITEM_FROM_WISHLIST_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.REMOVE_ITEM_FROM_WISHLIST_FAILED });
  }
}

export const wishlistSaga = [
  takeEvery(actionName.FETCH_WISHLIST, fetchWishlistByCustomer),
  takeEvery(actionName.ADD_ITEM_TO_WISHLIST, addItemToWishlist),
  takeEvery(actionName.REMOVE_ITEM_FROM_WISHLIST, removeItemFromWishlist),
];
