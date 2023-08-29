import { put, takeEvery } from 'redux-saga/effects';
import * as actionName from '../actions/name/notification';
import { getNotificationByCustomer } from '@apis/notificationApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchNotificationFailed, fetchNotificationStart, fetchNotificationSucceeded } from '@redux/reducers/notificationReducer';

function* fetchNotification(action: PayloadAction<any>) {
  try {
    yield put(fetchNotificationStart(action.payload))
    yield getNotificationByCustomer(action.payload.customerId)
    yield put(fetchNotificationSucceeded(action.payload));
  } catch (e) {
    yield put(fetchNotificationFailed(action.payload));
  }
}

export function* notificationSaga() {
    takeEvery(actionName.FETCH_NOTIFICATION_REQUESTED, fetchNotification);
}
