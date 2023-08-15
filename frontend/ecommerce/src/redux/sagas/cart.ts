import * as AC from '@actions/types/cart';
// import Api from '../apis/api-cart';
import { put, takeEvery } from 'redux-saga/effects';
// import { v4 as uuidv4 } from 'uuid';

// import { getGuestId, getUserId } from '../utils/helpers';

// ADD TO CART
function* addToCart(action) {
  try {
    yield put({ type: AC.CART_ADD_START });
    const uId = getUserId();
    let gId = getGuestId();
    if (!uId) {
      if (!gId) {
        gId = uuidv4();
        yield localStorage.setItem('_guestId', gId);
      }
    }
    // Merge payload
    yield Api.addCartItem({ ...action.payload, userId: uId, guestId: gId });
    yield put({ type: AC.CART_ADD_SUCCESS });
  } catch (e) {
    yield put({ type: AC.CART_ADD_FAILED });
  }
}

// REMOVE FROM CART
function* removeCart(action) {
  try {
    yield put({ type: AC.CART_REMOVE_START });
    yield Api.removeCartItem(action.payload);
    yield put({ type: AC.CART_REMOVE_SUCCESS });
  } catch (e) {
    yield put({ type: AC.CART_REMOVE_FAILED });
  }
}

// CART LIST FETCH
function* listFetch(action) {
  try {
    // yield put({ type: AC.CART_LIST_FETCH_START });
    const { data } = yield Api.fetchCarts(action.payload);
    yield put({ type: AC.CART_LIST_FETCH_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.CART_LIST_FETCH_FAILED });
  }
}

// APPLY COUPONS
function* applyCoupons(action) {
  try {
    yield put({ type: AC.CART_APPLY_COUPONS_START });
    yield Api.applyCoupons(action.payload);
    yield put({ type: AC.CART_APPLY_COUPONS_SUCCESS });
  } catch (e) {
    yield put({ type: AC.CART_APPLY_COUPONS_FAILED });
  }
}

// REMOVE COUPONS
function* removeCoupons(action) {
  try {
    yield put({ type: AC.CART_REMOVE_COUPONS_START });
    yield Api.removeCoupons(action.payload);
    yield put({ type: AC.CART_REMOVE_COUPONS_SUCCESS });
  } catch (e) {
    yield put({ type: AC.CART_REMOVE_COUPONS_FAILED });
  }
}

// CART CHANGE ITEM
function* changeItem(action) {
  try {
    yield put({ type: AC.CART_ITEM_CHANGE_START });
    yield Api.removeCartItem(action.payload);
    yield Api.addCartItem(action.payload.data);
    yield put({ type: AC.CART_ITEM_CHANGE_SUCCESS });
  } catch (e) {
    yield put({ type: AC.CART_ITEM_CHANGE_FAILED });
  }
}

// CREATE ORDER
function* createOrder(action) {
  try {
    yield put({ type: AC.CART_CREATE_ORDER_START });
    const { data } = yield Api.createOrder();
    yield put({ type: AC.CART_CREATE_ORDER_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.CART_CREATE_ORDER_FAILED });
  }
}

// ONLINE CHECKOUT
function* onlineCheckout(action) {
  try {
    yield put({ type: AC.CART_ONLINE_CHECKOUT_START });
    const { data } = yield Api.onlineCheckout(action.payload);
    yield put({ type: AC.CART_ONLINE_CHECKOUT_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.CART_ONLINE_CHECKOUT_FAILED });
  }
}

// OFFLINE CHECKOUT
function* offlineCheckout(action) {
  // use the same events as CHECKOUT_DONE to use shared reducer
  try {
    yield put({ type: AC.CART_CHECKOUT_DONE_START });
    const { data } = yield Api.offlineCheckout(action.payload);
    yield put({ type: AC.CART_CHECKOUT_DONE_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.CART_CHECKOUT_DONE_FAILED });
  }
}

// OFFLINE CHECKOUT
function* cartCheckoutDone(action) {
  try {
    yield put({ type: AC.CART_CHECKOUT_DONE_START });
    const { data } = yield Api.markDone(action.payload);
    yield put({ type: AC.CART_CHECKOUT_DONE_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.CART_CHECKOUT_DONE_FAILED });
  }
}

// SYNC CART
function* syncCartItems(action) {
  try {
    yield put({ type: AC.CART_SYNC_START });
    yield Api.syncCart(action.payload);
    yield put({ type: AC.CART_SYNC_SUCCESS });
  } catch (e) {
    yield put({ type: AC.CART_SYNC_FAILED });
  }
}

// APPLY REFERRAL
function* applyReferral(action) {
  try {
    yield put({ type: AC.CART_APPLY_REFERRAL_START });
    yield Api.applyReferral(action.payload);
    yield put({ type: AC.CART_APPLY_REFERRAL_SUCCESS });
  } catch (e) {
    yield put({ type: AC.CART_APPLY_REFERRAL_FAILED });
  }
}

// REMOVE REFERRAL
function* removeReferral(action) {
  try {
    yield put({ type: AC.CART_REMOVE_REFERRAL_START });
    yield Api.removeReferral(action.payload);
    yield put({ type: AC.CART_REMOVE_REFERRAL_SUCCESS });
  } catch (e) {
    yield put({ type: AC.CART_REMOVE_REFERRAL_FAILED });
  }
}

// List of watchers
export const cartSagas = [
  takeEvery(AC.CART_ADD, addToCart),
  takeEvery(AC.CART_REMOVE, removeCart),
  takeEvery(AC.CART_LIST_FETCH, listFetch),
  takeEvery(AC.CART_ITEM_CHANGE, changeItem),
  takeEvery(AC.CART_REMOVE_COUPONS, removeCoupons),
  takeEvery(AC.CART_APPLY_COUPONS, applyCoupons),
  takeEvery(AC.CART_APPLY_REFERRAL, applyReferral),
  takeEvery(AC.CART_REMOVE_REFERRAL, removeReferral),
  takeEvery(AC.CART_CREATE_ORDER, createOrder),
  takeEvery(AC.CART_ONLINE_CHECKOUT, onlineCheckout),
  takeEvery(AC.CART_OFFLINE_CHECKOUT, offlineCheckout),
  takeEvery(AC.CART_CHECKOUT_DONE, cartCheckoutDone),
  takeEvery(AC.CART_SYNC, syncCartItems),
];
