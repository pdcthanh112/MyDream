// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import * as authApi from '@apis/employeeApi';
// import { LoginForm } from '@models/EmployeeModel';

// export const login = createAsyncThunk('auth/login', async (data: LoginForm, thunkAPI) => {
//   try {
//     const response = await authApi.login(data.email, data.password);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const signup = createAsyncThunk('auth/register', async ({ data }: any, thunkAPI) => {
//   try {
//     const response = await authApi.signup(data);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//   try {
//     // const response = await authApi.signup(data);
//     // return response.data;
//     return null;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     login: {
//       loading: false,
//       currentUser: null,
//       error: false,
//       success: false,
//     },
//     signup: {
//       loading: false,
//       userData: {},
//       error: '',
//       success: false,
//     },
//     logout: {
//       loading: false,
//       error: false,
//     },
//     edit: {
//       loading: false,
//       error: false,
//     },
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(login.pending, (state, action) => {
//       // return { ...state, state.login.loading = true}
//       state.login.loading = true;
//     });
//     builder.addCase(login.fulfilled, (state, action) => {
//       state.login.loading = false;
//       state.login.success = true;
//       state.login.error = false;
//       state.login.currentUser = action.payload.data;
//     });
//     builder.addCase(login.rejected, (state, action) => {
//       state.login.error = true;
//     });
//     builder.addCase(logout.pending, (state, action) => {
//       // return { ...state, state.login.loading = true}
//       state.login.loading = true;
//     });
//     builder.addCase(logout.fulfilled, (state, action) => {
//       state.login.loading = false;
//       state.login.success = true;
//       state.login.error = false;
//       state.login.currentUser = null;
//       // state.login.currentUser.userData = {};
//       // state.login.currentUser.tokenData = {};
//     });
//     builder.addCase(logout.rejected, (state, action) => {
//       state.login.error = true;
//     });
//   },
// });

// // export const { loginStart, loginSuccess, loginFailed, logoutStart, logoutSuccess, logoutFailed, editStart, editSuccess, editFailed } = authSlice.actions;
// export default authSlice.reducer;
