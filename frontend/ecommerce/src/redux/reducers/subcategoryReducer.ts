import { FetchSubcategoryFailedPayload, FetchSubcategoryStartPayload, FetchSubcategorySuccessPayload } from '@redux/actions/payload/subcategory';
import { SubcategoryState } from '@redux/actions/type/subcategory';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: SubcategoryState = {
  pending: false,
  success: false,
  data: [],
  error: null,
};

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState: initialState,
  reducers: {
    fetchSubcategoryStart: (state: SubcategoryState, action: PayloadAction<FetchSubcategoryStartPayload>) => {
      state.pending = true;
    },
    fetchSubcategorySuccess: (state: SubcategoryState, action: PayloadAction<FetchSubcategorySuccessPayload>) => {
      state.pending = false;
      state.success = true;
      state.data = action.payload.data;
    },
    fetchSubcategoryFailed: (state: SubcategoryState, action: PayloadAction<FetchSubcategoryFailedPayload>) => {
      state.success = false;
      state.error = 'loi';
    },
  },
});

export const { fetchSubcategoryStart, fetchSubcategorySuccess, fetchSubcategoryFailed } = subcategorySlice.actions;
export default subcategorySlice.reducer;
