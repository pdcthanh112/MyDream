import * as actionName from '../name/notification';
import { FetchNotificationFailedPayload, FetchNotificationStartPayload, FetchNotificationSuccessPayload } from '../payload/notification';

export interface NotificationState {
  pending: boolean;
  success: boolean;
  error: string | null;
  data: {};
}

export type FetchNotificationStart = {
  type: typeof actionName.FETCH_NOTIFICATION_START;
  payload: FetchNotificationStartPayload;
};

export type FetchNotificationSuccess = {
  type: typeof actionName.FETCH_NOTIFICATION_SUCCESS;
  payload: FetchNotificationSuccessPayload;
};

export type FetchNotificationFailed = {
  type: typeof actionName.FETCH_NOTIFICATION_FAILED;
  payload: FetchNotificationFailedPayload;
};
