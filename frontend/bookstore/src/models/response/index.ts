import { PaginationParams } from "../request";

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}