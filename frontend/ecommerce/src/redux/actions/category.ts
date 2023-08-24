import * as actionName from './name/category';
import { FetchCategoryFailedPayload, FetchCategoryStartPayload, FetchCategorySuccessPayload } from './payload/category';

export const fetchCategoryStart = (payload: FetchCategoryStartPayload) => ({
  type: actionName.FETCH_CATEGORY_START,
  payload,
});

export const fetchCategorySuccess = (payload: FetchCategorySuccessPayload) => ({
  type: actionName.FETCH_CATEGORY_SUCCESS,
  payload,
});

export const fetchCategoryFailed = (payload: FetchCategoryFailedPayload) => ({
  type: actionName.FETCH_CATEGORY_FAILED,
  payload,
});
