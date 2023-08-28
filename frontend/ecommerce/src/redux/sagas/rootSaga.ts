import { all } from 'redux-saga/effects';

import { authSaga } from './authSaga';
import { categorySaga } from './categorySaga';
import { subcategorySaga } from './subcategorySaga';
import { notificationSaga } from './notificationSaga';
import { wishlistSaga } from './wishlistSaga';

export default function* rootSaga() {
  yield all([authSaga(), categorySaga(), subcategorySaga(), notificationSaga(), wishlistSaga()]);
}
