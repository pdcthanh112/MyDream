import { createSlice } from '@reduxjs/toolkit';

const appDataSlice = createSlice({
  name: 'appData',
  initialState: {  
    category: null,
    subcategory: null,
  },
  reducers: {
    setAppData: (state, action) => {
      state.category = action.payload.category.data;
      state.subcategory = action.payload.subcategory.data;
    },
  },
});

export const { setAppData } = appDataSlice.actions;
export default appDataSlice.reducer;
