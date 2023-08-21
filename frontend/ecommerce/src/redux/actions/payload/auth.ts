export interface LoginStartPayload {
  params: { email: string; password: string };
}

export interface LoginSuccessPayload {
  data: {};
}

export interface LoginFailedPayload {
  error: string;
}

export interface SignupStartPayload {
  params: { email: string; password: string };
}

export interface SignupSuccessPayload {
  data: {};
}

export interface SignupFailedPayload {
  error: string;
}

export interface ResetPasswordStartPayload {
  params: { email: string; password: string };
}

export interface ResetPasswordSuccessPayload {
  data: {};
}

export interface ResetPasswordFailedPayload {
  error: string;
}

export interface EditProfileStartPayload {
  params: { email: string; password: string };
}

export interface EditProfileSuccessPayload {
  data: {};
}

export interface EditProfileFailedPayload {
  error: string;
}
