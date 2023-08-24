export interface FetchCategoryStartPayload {
    params: { userId: string };
  }
  export interface FetchCategorySuccessPayload {
    data: [];
  }
  export interface FetchCategoryFailedPayload {
    error: string;
  }