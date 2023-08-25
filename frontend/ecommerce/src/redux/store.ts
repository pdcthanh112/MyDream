import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import categoryReducer from './reducers/categoryReducer';
import cartReducer from './reducers/cartReducer';
import wishlistReducer from './reducers/wishlistReducer';
import subcategoryReducer from './reducers/subcategoryReducer';
import notificationReducer from './reducers/notificationReducer';
import cartItemReducer from './reducers/cartItemReducer';
import { getDefaultState } from '@utils/helper';

const defaultState = getDefaultState()
console.log('CCCCCCCCCCCCCCCCCCCCCCC', defaultState);

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  cartItem: cartItemReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  notification: notificationReducer,
  wishlist: wishlistReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, 
    }).concat([sagaMiddleware]),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {
    category: {
      pending: false,
      success: false,
      error: null,
      data: [],
    },
    subcategory: {
      pending: false,
      success: false,
      error: null,
      data: [],
    },
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
