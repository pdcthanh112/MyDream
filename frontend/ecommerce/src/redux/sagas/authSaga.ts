import { put, takeEvery } from 'redux-saga/effects';
import * as actionName from '../actions/name/auth';

function* login(action: any) {
  try {
    yield put({ type: actionName.LOGIN_START });
  } catch (e) {
    yield put({ type: actionName.LOGIN_FAILED });
  }
}

function* signup(action: any) {
  try {
    yield put({ type: actionName.SIGNUP_START });
  } catch (e) {
    yield put({ type: actionName.SIGNUP_FAILED });
  }
}

function* resetPassword(action: any) {
  try {
    yield put({ type: actionName.RESET_PASSWORD_START });
  } catch (e) {
    yield put({ type: actionName.RESET_PASSWORD_FAILED });
  }
}

function* editProfile(action: any) {
  try {
    yield put({ type: actionName.EDIT_PROFILE_START });
  } catch (e) {
    yield put({ type: actionName.EDIT_PROFILE_FAILED });
  }
}

export const authSaga = [
  takeEvery(actionName.LOGIN, login),
  takeEvery(actionName.SIGNUP, signup),
  takeEvery(actionName.RESET_PASSWORD, resetPassword),
  takeEvery(actionName.EDIT_PROFILE, editProfile),
];
