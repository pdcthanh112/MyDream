import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import * as actionName from '../actions/name/category';
import * as api from '@apis/categoryApi';

function* fetchCategory(action: PayloadAction<any>) {
  try {
    yield put({ type: actionName.FETCH_CATEGORY_START });
    const { data } = yield api.getAllCategory();
    yield console.log('SSSSSSSSSSSSSSSSSSSS', data)
    yield put({ type: actionName.FETCH_CATEGORY_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: actionName.FETCH_CATEGORY_FAILED });
  }
}

export function* categorySaga() {
  takeEvery(actionName.FETCH_CATEGORY, fetchCategory);
}
