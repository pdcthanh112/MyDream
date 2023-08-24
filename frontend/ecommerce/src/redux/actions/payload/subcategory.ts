export interface FetchSubcategoryStartPayload {
    params: { userId: string };
  }
  export interface FetchSubcategorySuccessPayload {
    data: [];
  }
  export interface FetchSubcategoryFailedPayload {
    error: string;
  }