import { all } from 'redux-saga/effects';

import { authSaga } from './authSaga';
import { categorySaga } from './categorySaga';
import { subcategorySaga } from './subcategorySaga';
import { notificationSaga } from './notificationSaga';
import { wishlistSaga } from './wishlistSaga';
import { cartSaga } from './cartSaga';
import { cartItemSaga } from './cartItemSaga';

export default function* rootSaga() {
  yield all([authSaga(), cartSaga(), cartItemSaga(), categorySaga(), subcategorySaga(), notificationSaga(), wishlistSaga()]);
}
