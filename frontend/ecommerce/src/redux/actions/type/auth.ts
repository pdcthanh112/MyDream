import { Customer } from '@models/CustomerModel';
import * as actionName from '../name/auth';
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
} from '../payload/auth';

export interface AuthState {
  login: {
    pending: boolean;
    success: boolean;
    error: string | null;
    currentUser: any;
  };
  signup: {
    pending: boolean;
    success: boolean;
    error: string | null;
    userData: {} | null;
  };
  logout: {
    pending: boolean;
    success: boolean;
    error: string | null;
    data: {} | null;
  };
  edit: {
    pending: boolean;
    success: boolean;
    error: string | null;
    data: {} | null;
  };
}

export type LoginStart = {
  type: typeof actionName.LOGIN_START;
  payload: LoginStartPayload;
};

export type LoginSuccess = {
  type: typeof actionName.LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
};

export type LoginFailed = {
  type: typeof actionName.LOGIN_FAILED;
  payload: LoginFailedPayload;
};

export type SignupStart = {
  type: typeof actionName.SIGNUP_START;
  payload: SignupStartPayload;
};

export type SignupSuccess = {
  type: typeof actionName.SIGNUP_SUCCESS;
  payload: SignupSuccessPayload;
};

export type SignupFailed = {
  type: typeof actionName.SIGNUP_FAILED;
  payload: SignupFailedPayload;
};

export type ResetPasswordStart = {
  type: typeof actionName.RESET_PASSWORD_START;
  payload: ResetPasswordStartPayload;
};

export type ResetPasswordSuccess = {
  type: typeof actionName.RESET_PASSWORD_SUCCESS;
  payload: ResetPasswordSuccessPayload;
};

export type ResetPasswordFailed = {
  type: typeof actionName.RESET_PASSWORD_FAILED;
  payload: ResetPasswordFailedPayload;
};

export type EditProfileStart = {
  type: typeof actionName.EDIT_PROFILE_START;
  payload: EditProfileStartPayload;
};

export type EditProfileSuccess = {
  type: typeof actionName.EDIT_PROFILE_SUCCESS;
  payload: EditProfileSuccessPayload;
};

export type EditProfileFailed = {
  type: typeof actionName.EDIT_PROFILE_FAILED;
  payload: EditProfileFailedPayload;
};

export type AuthAction =
  | LoginStart
  | LoginSuccess
  | LoginFailed
  | SignupStart
  | SignupSuccess
  | SignupFailed
  | ResetPasswordStart
  | ResetPasswordSuccess
  | ResetPasswordFailed
  | EditProfileStart
  | EditProfileSuccess
  | EditProfileFailed;
