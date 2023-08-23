import { put, takeEvery } from 'redux-saga/effects';
import * as actionName from '../actions/name/auth';
import * as authApi from '@apis/customerApi';
import { PayloadAction } from '@reduxjs/toolkit';

function* login(action: PayloadAction<any>) {
  try {
    yield put({ type: actionName.LOGIN_START });
    const { userData, token } = yield authApi.login(action.payload.email, action.payload.password);
    yield localStorage.setItem('user', userData);
    yield localStorage.setItem('token', token);
    yield put({ type: actionName.LOGIN_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.LOGIN_FAILED });
  }
}

function* signup(action: PayloadAction<any>) {
  try {
    yield put({ type: actionName.SIGNUP_START });

    yield put({ type: actionName.SIGNUP_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.SIGNUP_FAILED });
  }
}

function* resetPassword(action: any) {
  try {
    yield put({ type: actionName.RESET_PASSWORD_START });
    yield put({ type: actionName.RESET_PASSWORD_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.RESET_PASSWORD_FAILED });
  }
}

function* editProfile(action: any) {
  try {
    yield put({ type: actionName.EDIT_PROFILE_START });
    yield put({ type: actionName.EDIT_PROFILE_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.EDIT_PROFILE_FAILED });
  }
}

export function* authSaga() {
  takeEvery(actionName.LOGIN, login);
  takeEvery(actionName.SIGNUP, signup);
  takeEvery(actionName.RESET_PASSWORD, resetPassword);
  takeEvery(actionName.EDIT_PROFILE, editProfile);
}
