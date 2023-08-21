import * as actionName from '@redux/actions/name/auth';
import { AuthAction, AuthState } from '@redux/actions/type/auth';

const initialState: AuthState = {
  pending: false,
  success: false,
  error: null,
  data: {},
};

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case actionName.LOGIN_START: {
      return { ...state, pending: true };
    }
    case actionName.LOGIN_SUCCESS: {
      return { ...state, pending: false, success: true, error: null, data: action.payload };
    }
    case actionName.LOGIN_FAILED: {
      return { ...state, success: false, error: 'loi' };
    }
    case actionName.SIGNUP_START: {
      return { ...state, pending: true };
    }
    case actionName.SIGNUP_SUCCESS: {
      return { ...state, pending: false, success: true, error: null, data: action.payload };
    }
    case actionName.SIGNUP_FAILED: {
      return { ...state, success: false, error: 'loi' };
    }
    case actionName.RESET_PASSWORD_START: {
      return { ...state, pending: true };
    }
    case actionName.RESET_PASSWORD_SUCCESS: {
      return { ...state, pending: false, success: true, error: null, data: action.payload };
    }
    case actionName.RESET_PASSWORD_FAILED: {
      return { ...state, success: false, error: 'loi' };
    }
    case actionName.EDIT_PROFILE_START: {
      return { ...state, pending: true };
    }
    case actionName.EDIT_PROFILE_SUCCESS: {
      return { ...state, pending: false, success: true, error: null, data: action.payload };
    }
    case actionName.EDIT_PROFILE_FAILED: {
      return { ...state, success: false, error: 'loi' };
    }
    default:
      return state;
  }
};
