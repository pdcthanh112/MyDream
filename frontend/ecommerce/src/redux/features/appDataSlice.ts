import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
  name: "appData",
  initialState: {
    data: {
      category: null,
      subcategory: null,
    },
  },
  reducers: {
    setAppData: (state, action) => {
      state.data.category = action.payload.category;
      state.data.subcategory = action.payload.subcategory;
    },
  },
});

export const { setAppData } = appDataSlice.actions;
export default appDataSlice.reducer;