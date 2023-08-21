import * as actionName from './name/auth';
import {
  EditProfileFailedPayload,
  EditProfileStartPayload,
  EditProfileSuccessPayload,
  LoginFailedPayload,
  LoginStartPayload,
  LoginSuccessPayload,
  ResetPasswordFailedPayload,
  ResetPasswordStartPayload,
  ResetPasswordSuccessPayload,
  SignupFailedPayload,
  SignupStartPayload,
  SignupSuccessPayload,
} from './payload/auth';
import {
  EditProfileFailed,
  EditProfileStart,
  EditProfileSuccess,
  LoginFailed,
  LoginStart,
  LoginSuccess,
  ResetPasswordFailed,
  ResetPasswordStart,
  ResetPasswordSuccess,
  SignupFailed,
  SignupStart,
  SignupSuccess,
} from './type/auth';

export const loginStart = (payload: LoginStartPayload): LoginStart => ({
  type: actionName.LOGIN_START,
  payload,
});

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
  type: actionName.LOGIN_SUCCESS,
  payload,
});

export const loginFailed = (payload: LoginFailedPayload): LoginFailed => ({
  type: actionName.LOGIN_FAILED,
  payload,
});

export const signupStart = (payload: SignupStartPayload): SignupStart => ({
  type: actionName.SIGNUP_START,
  payload,
});

export const signupSuccess = (payload: SignupSuccessPayload): SignupSuccess => ({
  type: actionName.SIGNUP_SUCCESS,
  payload,
});

export const signupFailed = (payload: SignupFailedPayload): SignupFailed => ({
  type: actionName.SIGNUP_FAILED,
  payload,
});

export const resetPasswordStart = (payload: ResetPasswordStartPayload): ResetPasswordStart => ({
  type: actionName.RESET_PASSWORD_START,
  payload,
});

export const resetPasswordSuccess = (payload: ResetPasswordSuccessPayload): ResetPasswordSuccess => ({
  type: actionName.RESET_PASSWORD_SUCCESS,
  payload,
});

export const resetPasswordFailed = (payload: ResetPasswordFailedPayload): ResetPasswordFailed => ({
  type: actionName.RESET_PASSWORD_FAILED,
  payload,
});

export const editProfileStart = (payload: EditProfileStartPayload): EditProfileStart => ({
  type: actionName.EDIT_PROFILE_START,
  payload,
});

export const editProfileSuccess = (payload: EditProfileSuccessPayload): EditProfileSuccess => ({
  type: actionName.EDIT_PROFILE_SUCCESS,
  payload,
});

export const editProfileFailed = (payload: EditProfileFailedPayload): EditProfileFailed => ({
  type: actionName.EDIT_PROFILE_FAILED,
  payload,
});
