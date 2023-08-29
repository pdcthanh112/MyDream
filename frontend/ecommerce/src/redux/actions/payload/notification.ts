import { Notification } from "@models/NotificationModel";

export interface FetchNotificationStartPayload {
  params: { token: string };
}
export interface FetchNotificationSucceededPayload {
  data: Notification[];
}
export interface FetchNotificationFailedPayload {
  error: string;
}
