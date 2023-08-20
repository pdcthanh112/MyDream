export interface CreateNewCartStartPayload {
  values: { id: string; name: string };
  callback: () => void | any;
}

export interface CreateNewCartSuccessPayload {
  token: string;
}

export interface CreateNewCartFailedPayload {
  error: string;
}

export interface DeleteCartStartPayload {
    values: { id: string };
    callback: () => void | any;
  }
  
  export interface DeleteCartSuccessPayload {
    token: string;
  }
  
  export interface DeleteCartFailedPayload {
    error: string;
  }

  export interface AddToCartStartPayload {
    values: { email: string; password: string };
    callback: () => void | any;
  }
  
  export interface AddToCartSuccessPayload {
    token: string;
  }
  
  export interface AddToCartFailedPayload {
    error: string;
  }
