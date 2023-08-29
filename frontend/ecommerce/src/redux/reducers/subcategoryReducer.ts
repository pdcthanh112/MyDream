import { FetchSubcategoryFailedPayload, FetchSubcategoryStartPayload, FetchSubcategorySucceededPayload } from '@redux/actions/payload/subcategory';
import { SubcategoryState } from '@redux/actions/type/subcategory';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: SubcategoryState = {
  status: 'idle',
  error: null,
  data: [],
};

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState: initialState,
  reducers: {
    fetchSubcategoryStart: (state: SubcategoryState, action: PayloadAction<FetchSubcategoryStartPayload>) => {
      state.status = 'pending';
    },
    fetchSubcategorySuccess: (state: SubcategoryState, action: PayloadAction<FetchSubcategorySucceededPayload>) => {
      state.status = 'succeeded';
      state.data = action.payload;
    },
    fetchSubcategoryFailed: (state: SubcategoryState, action: PayloadAction<FetchSubcategoryFailedPayload>) => {
      state.status = 'failed';
      state.error = 'loi';
    },
  },
});

export const { fetchSubcategoryStart, fetchSubcategorySuccess, fetchSubcategoryFailed } = subcategorySlice.actions;
export default subcategorySlice.reducer;
