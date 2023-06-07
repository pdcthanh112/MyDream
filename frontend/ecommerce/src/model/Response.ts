import { PaginationParams } from "./Request";

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}