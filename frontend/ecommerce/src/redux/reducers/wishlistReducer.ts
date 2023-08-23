import {  WishlistState } from '@redux/actions/type/wishlist';
import * as actionName from '@redux/actions/name/wishlist';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FetchWishlistFailedPayload, FetchWishlistStartPayload, FetchWishlistSuccessPayload } from '@redux/actions/payload/wishlist';

const initialState: WishlistState = {
  pending: false,
  success: false,
  error: null,
  data: {},
};

const wishlistSlice = createSlice({
  name: 'WISHLIST',
  initialState: initialState,
  reducers: {
    FETCH_WISHLIST_START: (state: WishlistState, action: PayloadAction<FetchWishlistStartPayload>) => {
      state.pending = true;
    },
    FETCH_WISHLIST_SUCCESS: (state: WishlistState, action: PayloadAction<FetchWishlistSuccessPayload>) => {
      state.pending = false;
      state.success = true;
      state.data = action.payload.data;
    },
    FETCH_WISHLIST_FAILED: (state: WishlistState, action: PayloadAction<FetchWishlistFailedPayload>) => {
      state.pending = false;
      state.error = action.payload.error;
    },
  },
});

export const { FETCH_WISHLIST_START, FETCH_WISHLIST_SUCCESS, FETCH_WISHLIST_FAILED } = wishlistSlice.actions;
export default wishlistSlice.reducer;

