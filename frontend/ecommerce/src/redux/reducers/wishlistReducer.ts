import { WishlistState } from '@redux/actions/type/wishlist';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AddItemToWishlistFailedPayload,
  AddItemToWishlistStartPayload,
  AddItemToWishlistSucceededPayload,
  FetchWishlistFailedPayload,
  FetchWishlistStartPayload,
  FetchWishlistSucceededPayload,
  RemoveItemFromWishlistFailedPayload,
  RemoveItemFromWishlistStartPayload,
  RemoveItemFromWishlistSucceededPayload,
} from '@redux/actions/payload/wishlist';

const initialState: WishlistState = {
  status: 'idle',
  error: null,
  data: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    fetchWishlistStart: (state: WishlistState, action: PayloadAction<FetchWishlistStartPayload>) => {
      state.status = 'pending';
    },
    fetchWishlistSucceeded: (state: WishlistState, action: PayloadAction<FetchWishlistSucceededPayload>) => {
      state.status = 'pending';
      state.data = action.payload;
    },
    fetchWishlistFailed: (state: WishlistState, action: PayloadAction<FetchWishlistFailedPayload>) => {
      state.status = 'failed';
      state.error = 'loi';
    },
    addItemToWishlistStart: (state: WishlistState, action: PayloadAction<AddItemToWishlistStartPayload>) => {
      state.status = 'pending';
    },
    addItemToWishlistSucceeded: (state: WishlistState, action: PayloadAction<AddItemToWishlistSucceededPayload>) => {
      state.status = 'pending';
      state.data = action.payload;
    },
    addItemToWishlistFailed: (state: WishlistState, action: PayloadAction<AddItemToWishlistFailedPayload>) => {
      state.status = 'failed';
      state.error = 'loi';
    },
    removeItemFromWishlistStart: (state: WishlistState, action: PayloadAction<RemoveItemFromWishlistStartPayload>) => {
      state.status = 'pending';
    },
    removeItemFromWishlistSucceeded: (state: WishlistState, action: PayloadAction<RemoveItemFromWishlistSucceededPayload>) => {
      state.status = 'pending';
      state.data = action.payload;
    },
    removeItemFromWishlistFailed: (state: WishlistState, action: PayloadAction<RemoveItemFromWishlistFailedPayload>) => {
      state.status = 'failed';
      state.error = 'loi';
    },
  },
});

export const {
  fetchWishlistStart,
  fetchWishlistSucceeded,
  fetchWishlistFailed,
  addItemToWishlistStart,
  addItemToWishlistSucceeded,
  addItemToWishlistFailed,
  removeItemFromWishlistStart,
  removeItemFromWishlistSucceeded,
  removeItemFromWishlistFailed,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
