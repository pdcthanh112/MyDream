import { put, takeEvery } from 'redux-saga/effects';
import * as actionName from '../actions/name/notification';
import { getNotificationByCustomer } from '@apis/notificationApi';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchNotification(action: PayloadAction<any>) {
  try {
    yield put({type: actionName.FETCH_NOTIFICATION_START})
    yield getNotificationByCustomer(action.payload.customerId)
    yield put({ type: actionName.FETCH_NOTIFICATION_SUCCESS });
  } catch (e) {
    yield put({ type: actionName.FETCH_NOTIFICATION_FAILED });
  }
}

export function* notificationSaga() {
    takeEvery(actionName.FETCH_NOTIFICATION, fetchNotification);
}
