import { AddItemToCartFailedPayload, AddItemToCartStartPayload, AddItemToCartSuccessPayload } from '@redux/actions/payload/cartItem';
import { CartItemState } from '@redux/actions/type/cartItem';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: CartItemState = {
  pending: false,
  success: false,
  data: {},
  error: null,
};

const cartItemSlice = createSlice({
  name: 'cartItem',
  initialState: initialState,
  reducers: {
    ADD_ITEM_TO_CART_START: (state: CartItemState, action: PayloadAction<AddItemToCartStartPayload>) => {
      state.pending = true;
    },
    ADD_ITEM_TO_CART_SUCCESS: (state: CartItemState, action: PayloadAction<AddItemToCartSuccessPayload>) => {
      state.pending = false;
      state.success = true;
      state.data = action.payload.data;
    },
    ADD_ITEM_TO_CART_FAILED: (state: CartItemState, action: PayloadAction<AddItemToCartFailedPayload>) => {
      state.error = action.payload.error;
    },
  },
});

export const { ADD_ITEM_TO_CART_START, ADD_ITEM_TO_CART_SUCCESS, ADD_ITEM_TO_CART_FAILED } = cartItemSlice.actions;
export default cartItemSlice.reducer;
