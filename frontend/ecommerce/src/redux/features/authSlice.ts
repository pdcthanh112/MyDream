import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authApi from '@apis/customerApi';
import { LoginForm } from '@model/AuthModel';


export const login = createAsyncThunk('auth/login', async (data:LoginForm, thunkAPI) => {
  try {
    const response = await authApi.login(data.email, data.password);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signup = createAsyncThunk('auth/register', async ({ data }:any, thunkAPI) => {
  try {
    const response = await authApi.signup(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      loading: false,
      userInfo: null,
      tokenData: null,
      error: false,
      success: false,
    },
    signup: {
      loading: false,
      userData: {},
      error: '',
      success: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
    edit: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      // return { ...state, state.login.loading = true}
      state.login.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.login.loading = false;
      state.login.success = true;
      state.login.error = false;
      state.login.userInfo = action.payload.data.userInfo;
      state.login.tokenData = action.payload.data.tokenData;
    }); 
    builder.addCase(login.rejected, (state, action) => {
      state.login.error = true;
    });
  },
});

// export const { loginStart, loginSuccess, loginFailed, logoutStart, logoutSuccess, logoutFailed, editStart, editSuccess, editFailed } = authSlice.actions;
export default authSlice.reducer;
