// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { useQuery, gql } from '@apollo/client';

// export const setAppData = createAsyncThunk('appData/setAppData', async (_, thunkAPI) => {
//   try {
//     const { data } = useQuery(gql`
//       {
//         category {
//           id
//           name
//         }
//         subcategory {
//           id
//           name
//           category {
//             id
//             name
//           }
//         }
//       }
//     `);
//     return data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// const appDataSlice = createSlice({
//   name: 'appData',
//   initialState: {
//     category: [],
//     subcategory: [],
//   },
//   reducers: {
//     setAppData: (state, action) => {
//       state.category = action.payload.category.data;
//       state.subcategory = action.payload.subcategory.data;
//     },
//   },
//   extraReducers(builder) {
//     builder.addCase(setAppData.fulfilled, (state, action) => {
//       state.category = action.payload.category;
//       state.subcategory = action.payload.subcategory;
//     });
//   },
// });

// // export const { setAppData } = appDataSlice.actions;
// export default appDataSlice.reducer;
