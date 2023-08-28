import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import * as api from '@apis/categoryApi';
import { fetchCategoryFailed, fetchCategoryStart, fetchCategorySuccess } from '@redux/reducers/categoryReducer';


function* fetchCategory(action: PayloadAction<any>) {
  try {
    yield put(fetchCategoryStart(action.payload));
    const { data } = yield api.getAllCategory();
    yield console.log('SSSSSSSSSSSSSSSSSSSS', data)
    yield put(fetchCategorySuccess({data}));
  } catch (e) {
    yield put(fetchCategoryFailed(action.payload));
  }
}

export function* categorySaga() {
  takeEvery('category/fetchCategoryStart', fetchCategory);
  // takeEvery(actionName.FETCH_CATEGORY_START, fetchCategory);
}
