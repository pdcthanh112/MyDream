import { FetchCategoryFailedPayload, FetchCategoryStartPayload, FetchCategorySuccessPayload } from '@redux/actions/payload/category';
import { CategoryState } from '@redux/actions/type/category';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: CategoryState = {
  pending: false,
  success: false,
  error: null,
  data: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    fetchCategoryStart: (state: CategoryState, action: PayloadAction<FetchCategoryStartPayload>) => {
      state.pending = true;
    },
    fetchCategorySuccess: (state: CategoryState, action: PayloadAction<FetchCategorySuccessPayload>) => {
      state.pending = false;
      state.success = true;
      state.data = action.payload.data;
    },
    fetchCategoryFailed: (state: CategoryState, action: PayloadAction<FetchCategoryFailedPayload>) => {
      state.error = 'loi';
    },
  },
});

export const { fetchCategoryStart, fetchCategorySuccess, fetchCategoryFailed } = categorySlice.actions;
export default categorySlice.reducer;
