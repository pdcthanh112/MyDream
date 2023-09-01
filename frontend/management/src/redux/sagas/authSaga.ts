import { put, takeEvery } from 'redux-saga/effects';
import * as authApi from '@apis/customerApi';
import { PayloadAction } from '@reduxjs/toolkit';
import * as actionName from '../actions/name/auth';
import {
  editProfileFailed,
  editProfileStart,
  editProfileSucceeded,
  loginFailed,
  loginStart,
  loginSucceeded,
  logoutFailed,
  logoutStart,
  logoutSucceeded,
  signupFailed,
  signupStart,
  signupSucceeded,
} from '@redux/reducers/authReducer';
import { fetchNotificationRequested } from '@redux/actions/notification';
import { fetchCartRequested } from '@redux/actions/cart';
import { fetchWishlistRequested } from '@redux/actions/wishlist';

function* login(action: PayloadAction<any>) {
  try {
    yield put(loginStart(action.payload));
    const {
      data: { userData, tokenData },
    } = yield authApi.login(action.payload.email, action.payload.password);
    if (typeof window !== 'undefined') {
      yield localStorage.setItem('user', userData);
      yield localStorage.setItem('token', tokenData);
    }
    yield put(fetchNotificationRequested(userData.accountId))
    yield put(fetchCartRequested(userData.accountId))
    yield put(fetchWishlistRequested(userData.accountId))
    yield put(loginSucceeded({userData, tokenData}));
  } catch (e) {
    yield put(loginFailed(action.payload));
  }
}

function* logout(action: PayloadAction<any>) {
  try {
    yield put(logoutStart(action.payload));
    yield console.log('MMMMMMMMMMMMMMMMMMMMMMMM', action.payload);
    yield localStorage.removeItem('userData')
    yield localStorage.removeItem('tokenData')
    yield put(logoutSucceeded(action.payload));
  } catch (e) {
    yield put(logoutFailed(action.payload));
  }
}

function* signup(action: PayloadAction<any>) {
  try {
    yield put(signupStart(action.payload));
    yield authApi.signup(action.payload);
    yield put(signupSucceeded(action.payload));
  } catch (e) {
    yield put(signupFailed(action.payload));
  }
}

function* editProfile(action: PayloadAction<any>) {
  try {
    yield put(editProfileStart(action.payload));
    yield put(editProfileSucceeded(action.payload));
  } catch (e) {
    yield put(editProfileFailed(action.payload));
  }
}

export function* authSaga() {
  yield takeEvery(actionName.LOGIN_REQUESTED, login);
  yield takeEvery(actionName.LOGOUT_REQUESTED, logout);
  yield takeEvery(actionName.SIGNUP_REQUESTED, signup);
  yield takeEvery(actionName.EDIT_PROFILE_REQUESTED, editProfile);
}
