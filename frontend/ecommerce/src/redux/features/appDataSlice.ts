import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
  name: "appData",
  initialState: {
    data: {
      jobTitle: null,
      position: null,
      industry: null,
      province: null,
    },
  },
  reducers: {
    setAppData: (state, action) => {
      state.data.jobTitle = action.payload.jobTitle;
      state.data.position = action.payload.position;
      state.data.industry = action.payload.industry;
      state.data.province = action.payload.province;
    },
  },
});

export const { setAppData } = appDataSlice.actions;
export default appDataSlice.reducer;