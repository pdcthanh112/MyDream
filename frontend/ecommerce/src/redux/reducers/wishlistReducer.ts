import { WishlistAction, WishlistState } from '@redux/actions/type/wishlist';
import * as actionName from '@redux/actions/name/wishlist';

const initialState: WishlistState = {
  pending: false,
  success: false,
  error: null,
  data: {},
};

export const wishlistReducer = (state = initialState, action: WishlistAction) => {
  switch (action.type) {
    case actionName.FETCH_WISHLIST_START: {
      return { ...state, pending: true };
    }
    case actionName.FETCH_WISHLIST_SUCCESS: {
      return { ...state, pending: false, success: true, error: null, data: action.payload };
    }
    case actionName.FETCH_WISHLIST_FAILED: {
      return { ...state, success: false, error: action.payload.error };
    }
    case actionName.ADD_ITEM_TO_WISHLIST_START: {
      return { ...state, pending: true };
    }
    case actionName.ADD_ITEM_TO_WISHLIST_SUCCESS: {
      return { ...state, pending: false, success: true, error: null, data: action.payload };
    }
    case actionName.ADD_ITEM_TO_WISHLIST_FAILED: {
      return { ...state, success: false, error: action.payload.error };
    }
    case actionName.REMOVE_ITEM_FROM_WISHLIST_START: {
      return { ...state, pending: true };
    }
    case actionName.REMOVE_ITEM_FROM_WISHLIST_SUCCESS: {
      return { ...state, pending: false, success: true, error: null, data: action.payload };
    }
    case actionName.REMOVE_ITEM_FROM_WISHLIST_FAILED: {
      return { ...state, success: false, error: action.payload.error };
    }
    default:
      return state;
  }
};
