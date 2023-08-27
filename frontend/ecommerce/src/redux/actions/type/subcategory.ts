import { Subcategory } from '@models/SubcategoryModel';
import * as actionName from '../name/subcategory';
import { FetchSubcategoryFailedPayload, FetchSubcategoryStartPayload, FetchSubcategorySuccessPayload } from '../payload/subcategory';

export interface SubcategoryState {
  pending: boolean;
  success: boolean;
  error: string | null;
  data: Subcategory[];
}

export type FetchSubcategoryStart = {
  type: typeof actionName.FETCH_SUBCATEGORY_START;
  payload: FetchSubcategoryStartPayload;
};
export type FetchSubcategorySuccess = {
  type: typeof actionName.FETCH_SUBCATEGORY_SUCCESS;
  payload: FetchSubcategorySuccessPayload;
};
export type FetchSubcategoryFailed = {
  type: typeof actionName.FETCH_SUBCATEGORY_FAILED;
  payload: FetchSubcategoryFailedPayload;
};
