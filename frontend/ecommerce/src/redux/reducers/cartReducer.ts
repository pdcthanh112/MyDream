import { CartState } from '@redux/actions/type/cart';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  CreateNewCartFailedPayload,
  CreateNewCartStartPayload,
  CreateNewCartSucceededPayload,
  DeleteCartFailedPayload,
  DeleteCartStartPayload,
  DeleteCartSucceededPayload,
} from '@redux/actions/payload/cart';

const initialState: CartState = {
  status: 'idle',
  data: {},
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    createNewCartStart: (state: CartState, action: PayloadAction<CreateNewCartStartPayload>) => {
      state.status = 'pending';
    },
    createNewCartSucceeded: (state: CartState, action: PayloadAction<CreateNewCartSucceededPayload>) => {
      state.status = 'succeeded';
      state.data = action.payload.data;
    },
    createNewCartFailed: (state: CartState, action: PayloadAction<CreateNewCartFailedPayload>) => {
      state.status = 'failed';
      state.error = 'loi';
    },
    deleteCartStart: (state: CartState, action: PayloadAction<DeleteCartStartPayload>) => {
      state.status = 'pending';
    },
    deleteCartSucceeded: (state: CartState, action: PayloadAction<DeleteCartSucceededPayload>) => {
      state.status = 'succeeded';
      state.data = action.payload.data;
    },
    deleteCartFailed: (state: CartState, action: PayloadAction<DeleteCartFailedPayload>) => {
      state.status = 'failed';
      state.error = 'loi';
    },
  },
});

export const { createNewCartStart, createNewCartSucceeded, createNewCartFailed, deleteCartStart, deleteCartSucceeded, deleteCartFailed } = cartSlice.actions;
export default cartSlice.reducer;

