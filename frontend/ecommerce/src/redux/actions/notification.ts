import { FetchNotificationFailed, FetchNotificationStart, FetchNotificationSuccess } from './type/notification';
import * as actionName from './name/notification';
import { FetchNotificationFailedPayload, FetchNotificationStartPayload, FetchNotificationSuccessPayload } from './payload/notification';

export const fetchNotificationStart = (payload: FetchNotificationStartPayload): FetchNotificationStart => ({
  type: actionName.FETCH_NOTIFICATION_START,
  payload,
});

export const fetchNotificationSuccess = (payload: FetchNotificationSuccessPayload): FetchNotificationSuccess => ({
  type: actionName.FETCH_NOTIFICATION_SUCCESS,
  payload,
});

export const fetchNotificationFailed = (payload: FetchNotificationFailedPayload): FetchNotificationFailed => ({
  type: actionName.FETCH_NOTIFICATION_FAILED,
  payload,
});
