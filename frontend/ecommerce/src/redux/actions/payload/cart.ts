export interface CreateNewCartRequestedPayload {
  values: { id: string; name: string };
}

export interface CreateNewCartStartPayload {
  values: { id: string; name: string };
}

export interface CreateNewCartSucceededPayload {
  data: {};
}

export interface CreateNewCartFailedPayload {
  error: string;
}

export interface DeleteCartRequestedPayload {
  values: { id: string };
}

export interface DeleteCartStartPayload {
  values: { id: string };
}

export interface DeleteCartSucceededPayload {
  data: {};
}

export interface DeleteCartFailedPayload {
  error: string;
}

