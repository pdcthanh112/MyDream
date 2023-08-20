import { NotificationAction, NotificationState } from '@redux/actions/type/notification';
import * as actionName from '@redux/actions/name/notification';

const initialState: NotificationState = {
  pending: false,
  success: false,
  error: null,
  data: {},
};

export const notificationReducer = (state = initialState, action: NotificationAction) => {
  switch (action.type) {
    case actionName.FETCH_NOTIFICATION_START: {
      return { ...state, pending: true };
    }
    case actionName.FETCH_NOTIFICATION_SUCCESS: {
      return { ...state, pending: false, success: true, error: null, data: action.payload };
    }
    case actionName.FETCH_NOTIFICATION_FAILED: {
      return { ...state, success: false, error: 'loi' };
    }
    default:
      return state;
  }
};
