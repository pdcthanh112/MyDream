import { FetchNotificationFailed, FetchNotificationStart, FetchNotificationSucceeded } from './type/notification';
import * as actionName from './name/notification';
import { FetchNotificationFailedPayload, FetchNotificationStartPayload, FetchNotificationSucceededPayload } from './payload/notification';

export const fetchNotificationRequested = () => ({
  type: actionName.FETCH_NOTIFICATION_REQUESTED,
  payload: null,
});

export const fetchNotificationStart = (payload: FetchNotificationStartPayload): FetchNotificationStart => ({
  type: actionName.FETCH_NOTIFICATION_START,
  payload,
});

export const fetchNotificationSucceeded = (payload: FetchNotificationSucceededPayload): FetchNotificationSucceeded => ({
  type: actionName.FETCH_NOTIFICATION_SUCCEEDED,
  payload,
});

export const fetchNotificationFailed = (payload: FetchNotificationFailedPayload): FetchNotificationFailed => ({
  type: actionName.FETCH_NOTIFICATION_FAILED,
  payload,
});
