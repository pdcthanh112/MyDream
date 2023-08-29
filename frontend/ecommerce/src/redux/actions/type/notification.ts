import { Notification } from '@models/NotificationModel';
import * as actionName from '../name/notification';
import { FetchNotificationFailedPayload, FetchNotificationStartPayload, FetchNotificationSucceededPayload } from '../payload/notification';

export interface NotificationState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null;
  data: Notification[];
}

export type FetchNotificationStart = {
  type: typeof actionName.FETCH_NOTIFICATION_START;
  payload: FetchNotificationStartPayload;
};

export type FetchNotificationSucceeded = {
  type: typeof actionName.FETCH_NOTIFICATION_SUCCEEDED;
  payload: FetchNotificationSucceededPayload;
};

export type FetchNotificationFailed = {
  type: typeof actionName.FETCH_NOTIFICATION_FAILED;
  payload: FetchNotificationFailedPayload;
};
