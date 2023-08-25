import { PayloadAction } from '@reduxjs/toolkit';
import * as actionName from '../actions/name/subcategory'
import { put, takeEvery } from 'redux-saga/effects';

function* fetchSubcategory(action: PayloadAction<any>) {
    try {
        yield put({type: actionName.FETCH_SUBCATEGORY_START})

        yield put({type: actionName.FETCH_SUBCATEGORY_SUCCESS})
    } catch (e) {
        yield put(({type: actionName.FETCH_SUBCATEGORY_FAILED}))
    }
}

export function* subcategorySaga() {
    takeEvery(actionName.FETCH_SUBCATEGORY, fetchSubcategory)
}