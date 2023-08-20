import { CartAction, CartState } from '@redux/actions/type/cart';
import * as actionName from '@redux/actions/name/cart';

const initialState: CartState = {
  pending: false,
  success: false,
  error: null,
};

export const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case actionName.CREATE_NEW_CART_START: {
      return { ...state, pending: true };
    }
    case actionName.CREATE_NEW_CART_SUCCESS: {
      return { ...state, pending: false, success: true, error: null };
    }
    case actionName.CREATE_NEW_CART_FAILED: {
      return { ...state, pending: false, success: false, error: 'loi' };
    }
    
    case actionName.DELETE_CART_START: {
      return { ...state, pending: true };
    }
    case actionName.DELETE_CART_SUCCESS: {
      return { ...state, pending: false, success: true, error: null };
    }
    case actionName.DELETE_CART_FAILED: {
      return { ...state, pending: false, success: false, error: 'loi' };
    }

    case actionName.ADD_ITEM_TO_CART_START: {
      return { ...state, pending: true };
    }
    case actionName.ADD_ITEM_TO_CART_SUCCESS: {
      return { ...state, pending: false, success: true, error: null };
    }
    case actionName.ADD_ITEM_TO_CART_FAILED: {
      return { ...state, pending: false, success: false, error: 'loi' };
    }
    default:
      return state;
  }
};
