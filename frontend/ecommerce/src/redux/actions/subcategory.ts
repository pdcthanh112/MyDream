import * as actionName from './name/subcategory';
import { FetchSubcategoryFailedPayload, FetchSubcategoryStartPayload, FetchSubcategorySuccessPayload } from './payload/subcategory';

export const fetchCategoryStart = (payload: FetchSubcategoryStartPayload) => ({
  type: actionName.FETCH_SUBCATEGORY_START,
  payload,
});

export const fetchCategorySuccess = (payload: FetchSubcategorySuccessPayload) => ({
  type: actionName.FETCH_SUBCATEGORY_SUCCESS,
  payload,
});

export const fetchCategoryFailed = (payload: FetchSubcategoryFailedPayload) => ({
  type: actionName.FETCH_SUBCATEGORY_FAILED,
  payload,
});
