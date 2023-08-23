import { NotificationState } from '@redux/actions/type/notification';
import * as actionName from '@redux/actions/name/notification';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FetchNotificationFailedPayload, FetchNotificationStartPayload, FetchNotificationSuccessPayload } from '@redux/actions/payload/notification';

const initialState: NotificationState = {
  pending: false,
  success: false,
  error: null,
  data: {},
};

const notificationSlice = createSlice({
  name: 'NOTIFICAION',
  initialState: initialState,
  reducers: {
    FETCH_NOTIFICATION_START: (state: NotificationState, action: PayloadAction<FetchNotificationStartPayload>) => {
      state.pending = true;
    },
    FETCH_NOTIFICATION_SUCCESS: (state: NotificationState, action: PayloadAction<FetchNotificationSuccessPayload>) => {
      state.pending = false;
      state.success = true;
      state.data = action.payload.data;
    },
    FETCH_NOTIFICATION_FAILED: (state: NotificationState, action: PayloadAction<FetchNotificationFailedPayload>) => {
      state.pending = false;
      state.error = action.payload.error;
    },
  },
});

export const { FETCH_NOTIFICATION_START, FETCH_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAILED } = notificationSlice.actions;
export default notificationSlice.reducer;

