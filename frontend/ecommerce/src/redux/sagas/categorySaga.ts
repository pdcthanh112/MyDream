import { PayloadAction } from '@reduxjs/toolkit';
import {put, takeEvery} from 'redux-saga/effects'
import * as actionName from '../actions/name/category';

function* fetchCategory(action: PayloadAction<any>) {
    try {
        yield put({type: actionName.FETCH_CATEGORY_START})
        
        yield put({type: actionName.FETCH_CATEGORY_SUCCESS})
    } catch (e) {
        yield put({type: actionName.FETCH_CATEGORY_FAILED})
    }
}

export function* categorySaga() {
    takeEvery(actionName.FETCH_CATEGORY, fetchCategory)
}