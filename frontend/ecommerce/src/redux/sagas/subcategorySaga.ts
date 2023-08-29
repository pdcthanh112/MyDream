import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import * as api from '@apis/subcategoryApi';
import { fetchSubcategoryStart, fetchSubcategorySuccess } from '@redux/reducers/subcategoryReducer';
import { fetchCategoryFailed } from '@redux/reducers/categoryReducer';
import { FETCH_SUBCATEGORY_REQUESTED } from '@redux/actions/name/subcategory';

function* fetchSubcategory(action: PayloadAction<any>) {
  try {
    yield put(fetchSubcategoryStart(action.payload));
    const { data } = yield api.getAllSubategory();
    yield put(fetchSubcategorySuccess(data));
  } catch (e) {
    yield put(fetchCategoryFailed(action.payload));
  }
}

export function* subcategorySaga() {
  takeEvery(FETCH_SUBCATEGORY_REQUESTED, fetchSubcategory);
}
