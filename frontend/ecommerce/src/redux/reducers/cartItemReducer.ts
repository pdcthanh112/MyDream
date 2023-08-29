import { AddItemToCartFailedPayload, AddItemToCartStartPayload, AddItemToCartSucceededPayload } from '@redux/actions/payload/cartItem';
import { CartItemState } from '@redux/actions/type/cartItem';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: CartItemState = {
  status: 'idle',
  data: {},
  error: null,
};

const cartItemSlice = createSlice({
  name: 'cartItem',
  initialState: initialState,
  reducers: {
    addItemToCartStart: (state: CartItemState, action: PayloadAction<AddItemToCartStartPayload>) => {
      state.status = 'pending';
    },
    addItemToCartSucceeded: (state: CartItemState, action: PayloadAction<AddItemToCartSucceededPayload>) => {
      state.status = 'succeeded';
      state.data = action.payload.data;
    },
    addItemToCartFailed: (state: CartItemState, action: PayloadAction<AddItemToCartFailedPayload>) => {
      state.status = 'failed';
      state.error = 'loi';
    },
    removeItemFromCartStart: (state: CartItemState, action: PayloadAction<AddItemToCartStartPayload>) => {
      state.status = 'pending';
    },
    removeItemFromCartSucceeded: (state: CartItemState, action: PayloadAction<AddItemToCartSucceededPayload>) => {
      state.status = 'succeeded';
      state.data = action.payload.data;
    },
    removeItemFromCartFailed: (state: CartItemState, action: PayloadAction<AddItemToCartFailedPayload>) => {
      state.status = 'failed';
      state.error = 'loi';
    },
  },
});

export const { addItemToCartStart, addItemToCartSucceeded, addItemToCartFailed, removeItemFromCartStart, removeItemFromCartSucceeded, removeItemFromCartFailed } =
  cartItemSlice.actions;
export default cartItemSlice.reducer;
