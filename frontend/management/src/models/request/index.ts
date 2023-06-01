export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ListParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";

  // [key: string]: any;
}
