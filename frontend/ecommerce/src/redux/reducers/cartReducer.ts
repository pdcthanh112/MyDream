import { CartState } from '@redux/actions/type/cart';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  CreateNewCartFailedPayload,
  CreateNewCartStartPayload,
  CreateNewCartSuccessPayload,
  DeleteCartFailedPayload,
  DeleteCartStartPayload,
  DeleteCartSuccessPayload,
} from '@redux/actions/payload/cart';

const initialState: CartState = {
  pending: false,
  success: false,
  data: {},
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    CREATE_NEW_CART_START: (state: CartState, action: PayloadAction<CreateNewCartStartPayload>) => {
      state.pending = true;
    },
    CREATE_NEW_CART_SUCCESS: (state: CartState, action: PayloadAction<CreateNewCartSuccessPayload>) => {
      state.pending = false;
      state.success = true;
      state.data = action.payload.data;
    },
    CREATE_NEW_CART_FAILED: (state: CartState, action: PayloadAction<CreateNewCartFailedPayload>) => {
      state.pending = false;
      state.error = action.payload.error;
    },
    DELETE_CART_START: (state: CartState, action: PayloadAction<DeleteCartStartPayload>) => {
      state.pending = true;
    },
    DELETE_CART_SUCCESS: (state: CartState, action: PayloadAction<DeleteCartSuccessPayload>) => {
      state.pending = false;
      state.success = true;
      state.data = action.payload.data;
    },
    DELETE_CART_FAILED: (state: CartState, action: PayloadAction<DeleteCartFailedPayload>) => {
      state.pending = false;
      state.error = action.payload.error;
    },
  },
});

export const { CREATE_NEW_CART_START, CREATE_NEW_CART_SUCCESS, CREATE_NEW_CART_FAILED, DELETE_CART_START, DELETE_CART_SUCCESS, DELETE_CART_FAILED } = cartSlice.actions;
export default cartSlice.reducer;

// export const cartReducer = (state = initialState, action: CartAction) => {
//   switch (action.type) {
//     case actionName.CREATE_NEW_CART_START: {
//       return { ...state, pending: true };
//     }
//     case actionName.CREATE_NEW_CART_SUCCESS: {
//       return { ...state, pending: false, success: true, error: null };
//     }
//     case actionName.CREATE_NEW_CART_FAILED: {
//       return { ...state, pending: false, success: false, error: 'loi' };
//     }

//     case actionName.DELETE_CART_START: {
//       return { ...state, pending: true };
//     }
//     case actionName.DELETE_CART_SUCCESS: {
//       return { ...state, pending: false, success: true, error: null };
//     }
//     case actionName.DELETE_CART_FAILED: {
//       return { ...state, pending: false, success: false, error: 'loi' };
//     }

//     case actionName.ADD_ITEM_TO_CART_START: {
//       return { ...state, pending: true };
//     }
//     case actionName.ADD_ITEM_TO_CART_SUCCESS: {
//       return { ...state, pending: false, success: true, error: null };
//     }
//     case actionName.ADD_ITEM_TO_CART_FAILED: {
//       return { ...state, pending: false, success: false, error: 'loi' };
//     }
//     default:
//       return state;
//   }
// };
