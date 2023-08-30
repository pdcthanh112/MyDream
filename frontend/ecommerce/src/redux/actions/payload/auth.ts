export interface LoginRequestedPayload {
  params: { email: string; password: string };
}
export interface LoginStartPayload {
  params: { email: string; password: string };
}

export interface LoginSucceededPayload {
  data: {};
}

export interface LoginFailedPayload {
  error: string;
}
export interface LogoutRequestedPayload {
  params: { email: string; password: string };
}
export interface LogoutStartPayload {
  params: { email: string; password: string };
}

export interface LogoutSucceededPayload {
  data: {};
}

export interface LogoutFailedPayload {
  error: string;
}

export interface SignupRequestedPayload {
  params: { email: string; password: string };
}

export interface SignupStartPayload {
  params: { email: string; password: string };
}

export interface SignupSucceededPayload {
  data: {};
}

export interface SignupFailedPayload {
  error: string;
}

export interface EditProfileRequestedPayload {
  params: { email: string; password: string };
}

export interface EditProfileStartPayload {
  params: { email: string; password: string };
}

export interface EditProfileSucceededPayload {
  data: {};
}

export interface EditProfileFailedPayload {
  error: string;
}
