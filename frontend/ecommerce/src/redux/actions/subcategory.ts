import * as actionName from './name/subcategory';
import { FetchSubcategoryFailedPayload, FetchSubcategoryStartPayload, FetchSubcategorySuccessPayload } from './payload/subcategory';

export const fetchSubcategoryStart = (payload: FetchSubcategoryStartPayload) => ({
  type: actionName.FETCH_SUBCATEGORY_START,
  payload,
});

export const fetchSubcategorySuccess = (payload: FetchSubcategorySuccessPayload) => ({
  type: actionName.FETCH_SUBCATEGORY_SUCCESS,
  payload,
});

export const fetchSubcategoryFailed = (payload: FetchSubcategoryFailedPayload) => ({
  type: actionName.FETCH_SUBCATEGORY_FAILED,
  payload,
});
