import { put, takeEvery } from 'redux-saga/effects';
import { addToCart as addToCartApi } from '@apis/cartItemApi';
import * as cartAction from '../actions/cart';
import * as actionName from '../actions/name/cart';
import { PayloadAction } from '@reduxjs/toolkit';

// ADD TO CART
function* addToCart(action: PayloadAction<any>) {
  try {
    yield put({ type: actionName.ADD_ITEM_TO_CART_START });
    yield put(cartAction.addToCartStart(action.payload));
    // Merge payload
    // yield api.addToCart({ ...action.payload, userId: uId, guestId: gId });
    yield addToCartApi({ productId: action.payload.productId, quantity: action.payload.quantity, cartId: action.payload.cartId });
    yield put({ type: actionName.ADD_ITEM_TO_CART_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.ADD_ITEM_TO_CART_FAILED });
  }
}

// REMOVE FROM CART
function* deleteCart(action: any) {
  try {
    yield put({ type: actionType.CART_REMOVE_START });
    yield Api.removeCartItem(action.payload);
    yield put({ type: actionType.CART_REMOVE_SUCCESS });
  } catch (e) {
    yield put({ type: actionType.CART_REMOVE_FAILED });
  }
}

// CART LIST FETCH
function* listFetch(action: any) {
  try {
    // yield put({ type: AC.CART_LIST_FETCH_START });
    const { data } = yield Api.fetchCarts(action.payload);
    yield put({ type: actionType.CART_LIST_FETCH_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: actionType.CART_LIST_FETCH_FAILED });
  }
}

// CART CHANGE ITEM
function* changeItem(action: any) {
  try {
    yield put({ type: actionType.CART_ITEM_CHANGE_START });
    yield Api.removeCartItem(action.payload);
    yield Api.addCartItem(action.payload.data);
    yield put({ type: actionType.CART_ITEM_CHANGE_SUCCESS });
  } catch (e) {
    yield put({ type: actionType.CART_ITEM_CHANGE_FAILED });
  }
}

// CREATE ORDER
function* createOrder(action) {
  try {
    yield put({ type: actionType.CART_CREATE_ORDER_START });
    const { data } = yield Api.createOrder();
    yield put({ type: actionType.CART_CREATE_ORDER_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: actionType.CART_CREATE_ORDER_FAILED });
  }
}

// ONLINE CHECKOUT
function* onlineCheckout(action) {
  try {
    yield put({ type: actionType.CART_ONLINE_CHECKOUT_START });
    const { data } = yield Api.onlineCheckout(action.payload);
    yield put({ type: actionType.CART_ONLINE_CHECKOUT_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: actionType.CART_ONLINE_CHECKOUT_FAILED });
  }
}

// OFFLINE CHECKOUT
function* offlineCheckout(action) {
  // use the same events as CHECKOUT_DONE to use shared reducer
  try {
    yield put({ type: actionType.CART_CHECKOUT_DONE_START });
    const { data } = yield Api.offlineCheckout(action.payload);
    yield put({ type: actionType.CART_CHECKOUT_DONE_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: actionType.CART_CHECKOUT_DONE_FAILED });
  }
}

// OFFLINE CHECKOUT
function* cartCheckoutDone(action) {
  try {
    yield put({ type: actionType.CART_CHECKOUT_DONE_START });
    const { data } = yield Api.markDone(action.payload);
    yield put({ type: actionType.CART_CHECKOUT_DONE_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: actionType.CART_CHECKOUT_DONE_FAILED });
  }
}

// SYNC CART
function* syncCartItems(action) {
  try {
    yield put({ type: actionType.CART_SYNC_START });
    yield Api.syncCart(action.payload);
    yield put({ type: actionType.CART_SYNC_SUCCESS });
  } catch (e) {
    yield put({ type: actionType.CART_SYNC_FAILED });
  }
}

// List of watchers
export const cartSagas = [
  takeEvery(actionName.ADD_ITEM_TO_CART, addToCart),
  // takeEvery(actionType.CART_REMOVE, removeCart),
  // takeEvery(actionType.CART_LIST_FETCH, listFetch),
  // takeEvery(actionType.CART_ITEM_CHANGE, changeItem),
  // takeEvery(actionType.CART_REMOVE_COUPONS, removeCoupons),
  // takeEvery(actionType.CART_APPLY_COUPONS, applyCoupons),
  // takeEvery(actionType.CART_APPLY_REFERRAL, applyReferral),
  // takeEvery(actionType.CART_REMOVE_REFERRAL, removeReferral),
  // takeEvery(actionType.CART_CREATE_ORDER, createOrder),
  // takeEvery(actionType.CART_ONLINE_CHECKOUT, onlineCheckout),
  // takeEvery(actionType.CART_OFFLINE_CHECKOUT, offlineCheckout),
  // takeEvery(actionType.CART_CHECKOUT_DONE, cartCheckoutDone),
  // takeEvery(actionType.CART_SYNC, syncCartItems),
];
