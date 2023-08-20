export interface FetchNotificationStartPayload {
  params: { userId: string };
}
export interface FetchNotificationSuccessPayload {
  data: {};
}
export interface FetchNotificationFailedPayload {
  error: string;
}
