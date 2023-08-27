import { PayloadAction } from '@reduxjs/toolkit';
import * as actionName from '../actions/name/subcategory';
import { put, takeEvery } from 'redux-saga/effects';
import * as api from '@apis/subcategoryApi';

function* fetchSubcategory(action: PayloadAction<any>) {
  try {
    yield put({ type: actionName.FETCH_SUBCATEGORY_START });
    const { data } = yield api.getAllSubategory();
    yield put({ type: actionName.FETCH_SUBCATEGORY_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: actionName.FETCH_SUBCATEGORY_FAILED });
  }
}

export function* subcategorySaga() {
  takeEvery(actionName.FETCH_SUBCATEGORY, fetchSubcategory);
}
