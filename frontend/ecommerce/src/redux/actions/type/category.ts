import { Category } from '@models/AppDataModel';
import * as actionName from '../name/category';
import { FetchCategoryFailedPayload, FetchCategoryStartPayload, FetchCategorySuccessPayload } from '../payload/category';

export interface CategoryState {
  pending: boolean;
  success: boolean;
  error: string | null;
  data: Category[];
}

export type FetchCategoryStart = {
  type: typeof actionName.FETCH_CATEGORY_START;
  payload: FetchCategoryStartPayload;
};

export type FetchCategorySuccess = {
  type: typeof actionName.FETCH_CATEGORY_SUCCESS;
  payload: FetchCategorySuccessPayload;
};

export type FetchCategoryFailed = {
  type: typeof actionName.FETCH_CATEGORY_FAILED;
  payload: FetchCategoryFailedPayload;
};
