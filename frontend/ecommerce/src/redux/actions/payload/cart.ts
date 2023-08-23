export interface CreateNewCartStartPayload {
  values: { id: string; name: string };
}

export interface CreateNewCartSuccessPayload {
  data: {};
}

export interface CreateNewCartFailedPayload {
  error: string;
}

export interface DeleteCartStartPayload {
  values: { id: string };
}

export interface DeleteCartSuccessPayload {
  data: {};
}

export interface DeleteCartFailedPayload {
  error: string;
}

