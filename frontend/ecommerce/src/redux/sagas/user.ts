// import * as AC from '../../redux/actions/types/user';
import * as AC from '../actions/types/user';
import Router from 'next/router';
// import UserApi from '../apis/api-user';
import { put, takeEvery, all } from 'redux-saga/effects';
// import { handleHttpCode } from '../utils/helpers';
import { GET_USER } from '../actions/types/user';
import { GET_COMPANY_USERS } from '../actions/types/user';
import { CART_LIST_FETCH_SUCCESS, CART_SYNC } from '../actions/types/cart';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { getGuestId } from '../utils/helpers';

// LOGIN FUNCTION
function* login(action: PayloadAction) {
  try {
    yield put({ type: AC.LOGIN_START });
    let infoUser;
    if (action?.payload?.isAutoLogin) {
      yield localStorage.setItem('token', action?.payload?.dataUser?.token);
      yield localStorage.setItem('user', JSON.stringify(action?.payload?.dataUser));
      yield (infoUser = action?.payload?.dataUser);
    } else {
      const { data } = yield UserApi.login(action.payload);
      yield localStorage.setItem('token', data.token);
      yield localStorage.setItem('user', JSON.stringify(data));
      yield (infoUser = data);
    }

    // Sync cart items
    const gId = getGuestId();
    if (gId) {
      yield put({ type: CART_SYNC, payload: { guestId: gId } });
      yield localStorage.removeItem('_guestId');
    }
    yield put({ type: AC.LOGIN_SUCCESS });
    yield put({ type: AC.SET_INFO, payload: infoUser });
  } catch (e) {
    yield put({ type: AC.LOGIN_FAILED });
  }
}

// REGISTER FUNCTION
function* register(action) {
  try {
    console.log('data', action);
    yield put({ type: AC.REGISTER_START });
    const result = yield UserApi.register(action.payload);

    console.log('result', result);
    yield put({ type: AC.REGISTER_SUCCESS });
  } catch (e) {
    yield put({ type: AC.REGISTER_FAILED });
  }
}

// ACTIVATE FUNCTION
function* activate(action) {
  try {
    yield put({ type: AC.ACTIVATE_START });
    yield UserApi.activate(action.payload);
    yield put({ type: AC.ACTIVATE_SUCCESS });
  } catch (e) {
    yield put({ type: AC.ACTIVATE_FAILED });
  }
}

// FORGOT PWD FUNCTION
function* forgotPwd(action) {
  try {
    yield put({ type: AC.FORGOT_PWD_START });
    yield UserApi.forgotPwd(action.payload);
    yield put({ type: AC.FORGOT_PWD_SUCCESS });
  } catch (e) {
    yield put({ type: AC.FORGOT_PWD_FAILED });
  }
}

// RESET PWD FUNCTION
function* resetPwd(action) {
  try {
    yield put({ type: AC.RESET_PWD_START });
    yield UserApi.resetPwd(action.payload);
    yield put({ type: AC.RESET_PWD_SUCCESS });
  } catch (e) {
    yield put({ type: AC.RESET_PWD_FAILED });
  }
}

// LOGOUT FUNCTION
function* logout() {
  try {
    yield Router.push('/');

    yield localStorage.removeItem('token');
    yield localStorage.removeItem('user');
    yield localStorage.removeItem('temp_token');
    yield localStorage.removeItem('temp_user');
    yield localStorage.removeItem('_isTemp');

    yield put({
      type: CART_LIST_FETCH_SUCCESS,
      payload: {
        carts: [],
        coupons: [],
        price: { subTotal: 0, totalDiscount: 0, total: 0 },
      },
    });

    yield put({ type: AC.SET_INFO, payload: {} });
    yield Router.reload();
  } catch (e) {}
}

// GET USER INFO FUNCTION
function* getUser(action) {
  try {
    yield put({ type: AC.GET_USER_START });
    const { data } = yield UserApi.getUserInfo(action.payload);
    //Update localStorage if action creator is target user
    const logged = JSON.parse(localStorage.getItem('user'));
    if (logged.id === action.payload.id) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data));
      yield put({ type: AC.SET_INFO, payload: data });
    }

    yield put({ type: AC.GET_USER_SUCCESS, payload: data });
  } catch (e) {
    if (action.handleHttpCode) {
      yield handleHttpCode(e);
    } else {
      yield put({ type: AC.GET_USER_FAILED });
    }
  }
}

// GET USER INFO FUNCTION
function* updateUser(action) {
  try {
    yield put({ type: AC.UPDATE_USER_START });
    yield UserApi.update(action.payload);
    yield put({ type: AC.UPDATE_USER_SUCCESS });
    if (action.reload) {
      yield put({ type: GET_USER, payload: { id: action.payload.id } });
    }
  } catch (e) {
    yield put({ type: AC.UPDATE_USER_FAILED });
  }
}

// UPLOAD AVATAR FUNCTION
function* uploadAvatar(action) {
  try {
    yield put({ type: AC.UPDATE_USER_START });
    yield UserApi.uploadAvatar(action.payload);
    yield put({ type: AC.UPDATE_USER_SUCCESS });
    yield put({ type: GET_USER, payload: { id: action.payload.id } });
  } catch (e) {
    yield put({ type: AC.UPDATE_USER_FAILED });
  }
}

// REMOVE AVATAR FUNCTION
function* removeAvatar(action) {
  try {
    yield put({ type: AC.UPDATE_USER_START });
    yield UserApi.removeAvatar(action.payload);
    yield put({ type: AC.UPDATE_USER_SUCCESS });
    yield put({ type: GET_USER, payload: { id: action.payload.id } });
  } catch (e) {
    yield put({ type: AC.UPDATE_USER_FAILED });
  }
}

// UPLOAD COVER FUNCTION
function* uploadCover(action) {
  try {
    yield put({ type: AC.UPDATE_USER_START });
    yield UserApi.uploadCover(action.payload);
    yield put({ type: AC.UPDATE_USER_SUCCESS });
    yield put({ type: GET_USER, payload: { id: action.payload.id } });
  } catch (e) {
    yield put({ type: AC.UPDATE_USER_FAILED });
  }
}

// FETCH BUSINESSES
function* fetchBusinesses(action) {
  try {
    yield put({ type: AC.USER_BUSINESS_FETCH_START });
    const { data } = yield UserApi.fetchBusinesses(action.payload);
    yield put({ type: AC.USER_BUSINESS_FETCH_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.USER_BUSINESS_FETCH_FAILED });
  }
}

// FETCH LOGS
function* fetchLogs(action) {
  try {
    yield put({ type: AC.USER_LOGS_FETCH_START });
    const { data } = yield UserApi.fetchBusinesses(action.payload);
    yield put({ type: AC.USER_LOGS_FETCH_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.USER_LOGS_FETCH_FAILED });
  }
}

// CREATE USER
function* createUser(action) {
  try {
    yield put({ type: AC.CREATE_USER_START });

    if (action.payload.branchIds.length) {
      const branchId = action.payload.branchIds[0];
      delete action.payload.branchIds;
      action.payload.branchId = branchId;
    }

    const { data } = yield UserApi.create(action.payload);

    // Add branches for user
    // if (data?.branchIds?.length) {
    //   yield UserApi.updateBranches({ id: data.id, data: { branchIds: data.branchIds } });
    // }

    yield put({ type: AC.CREATE_USER_SUCCESS, payload: data });
    if (action.redirect) {
      yield Router.push(`/user-profile/${data.id}/info`);
    }
  } catch (e) {
    yield put({ type: AC.CREATE_USER_FAILED });
  }
}

// DELETE USER
function* deleteUser(action) {
  try {
    yield put({ type: AC.DELETE_USER_START });
    yield UserApi.deleteUser(action.payload);
    yield put({ type: AC.DELETE_USER_SUCCESS });
  } catch (e) {
    yield put({ type: AC.DELETE_USER_FAILED });
  }
}

// UPDATE BRANCHES
function* updateBranches(action) {
  try {
    yield put({ type: AC.USER_BRANCHES_UPDATE_START });
    yield UserApi.updateBranches(action.payload);
    yield put({ type: AC.USER_BRANCHES_UPDATE_SUCCESS });
    yield put({ type: GET_USER, payload: { id: action.payload.id } });
  } catch (e) {
    yield put({ type: AC.USER_BRANCHES_UPDATE_FAILED });
  }
}

// GET COMPANY USERS
function* getCompanyUsers() {
  try {
    yield put({ type: AC.GET_COMPANY_USERS_START });
    const { data } = yield UserApi.getCompanyUsers();
    yield put({ type: AC.GET_COMPANY_USERS_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.GET_COMPANY_USERS_FAILED });
  }
}

// GET BRANCH USERS
function* getBranchUsers(action) {
  try {
    yield put({ type: AC.GET_BRANCH_USERS_START });
    const { data } = yield UserApi.getBranchUsers(action.payload);
    const { users } = data;
    delete data.users;
    yield put({ type: AC.GET_BRANCH_USERS_SUCCESS, payload: (users || []).map(x => ({ ...x, branches: [data] })) || [] });
  } catch (e) {
    yield put({ type: AC.GET_BRANCH_USERS_FAILED });
  }
}

// GET BUSINESS USERS
function* getBusinessUsers(action) {
  try {
    yield put({ type: AC.GET_BUSINESS_USERS_START });
    const { data } = yield UserApi.getBusinessUsers(action.payload);
    yield put({ type: AC.GET_BUSINESS_USERS_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.GET_BUSINESS_USERS_FAILED });
  }
}

// EXPORT COMPANY USERS
function* exportCompanyUsers(action) {
  try {
    yield put({ type: AC.COMPANY_USER_EXPORT_START });
    const { data } = yield UserApi.exportCompanyUsers(action.payload);
    yield put({ type: AC.COMPANY_USER_EXPORT_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.COMPANY_USER_EXPORT_FAILED });
  }
}

// IMPORT COMPANY USERS
function* importCompanyUsers(action) {
  try {
    yield put({ type: AC.COMPANY_USER_IMPORT_START });
    const { data } = yield UserApi.importCompanyUsers(action.payload);
    yield put({ type: AC.COMPANY_USER_IMPORT_SUCCESS, payload: { response: data } });
    yield put({ type: GET_COMPANY_USERS });
  } catch (e) {
    yield put({ type: AC.COMPANY_USER_IMPORT_FAILED });
  }
}

// *---------------------- DOWNLOAD CSV TEMPLATE ----------------------* //
function* downloadCSVTemplate(action) {
  try {
    yield put({ type: AC.COMPANY_USER_DOWNLOAD_CSV_TEMPLATE_START });
    const { data } = yield UserApi.downloadCSVTemplate();
    yield put({ type: AC.COMPANY_USER_DOWNLOAD_CSV_TEMPLATE_SUCCESS, payload: { linkReturn: data } });
  } catch (e) {
    yield put({ type: AC.COMPANY_USER_DOWNLOAD_CSV_TEMPLATE_FAILED });
  }
}

// LOGIN ON BEHALF OF THE USER
function* loginAs(action) {
  try {
    yield put({ type: AC.LOGIN_AS_START });
    const { data } = yield UserApi.loginAs(action.payload);
    const isTemp = localStorage.getItem('_isTemp') || '';
    if ('true' !== isTemp.toString()) {
      const mainUser = localStorage.getItem('user');
      const mainToken = localStorage.getItem('token');
      localStorage.setItem('temp_user', mainUser);
      localStorage.setItem('temp_token', mainToken);
    }
    localStorage.setItem('_isTemp', 'true');
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', data.token);
    yield put({ type: AC.SET_INFO, payload: data });
    yield Router.push('/');
    yield put({ type: AC.LOGIN_AS_SUCCESS });
  } catch (e) {
    yield put({ type: AC.LOGIN_AS_FAILED });
  }
}

// SWITCH TO ORIGINAL USER
function* switchUser() {
  try {
    yield put({ type: AC.SWITCH_USER_START });
    const mainUser = localStorage.getItem('temp_user');
    const mainToken = localStorage.getItem('temp_token');
    const data = JSON.parse(mainUser);
    localStorage.setItem('user', mainUser);
    localStorage.setItem('token', mainToken);

    localStorage.removeItem('_isTemp');
    localStorage.removeItem('temp_token');
    localStorage.removeItem('temp_user');

    yield put({ type: AC.SET_INFO, payload: data });
    yield Router.push('/');
    yield put({ type: AC.SWITCH_USER_SUCCESS });
  } catch (e) {
    yield put({ type: AC.SWITCH_USER_FAILED });
  }
}

// EXPORT BRANCH USERS
function* exportBranchUsers(action) {
  try {
    yield put({ type: AC.BRANCH_USER_EXPORT_START });
    const { data } = yield UserApi.exportBranchUsers(action.payload);
    yield put({ type: AC.BRANCH_USER_EXPORT_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.BRANCH_USER_EXPORT_FAILED });
  }
}

// IMPORT BRANCH USERS
function* importBranchUsers(action) {
  try {
    yield put({ type: AC.BRANCH_USER_IMPORT_START });
    yield UserApi.importBranchUsers(action.payload);
    yield put({ type: AC.BRANCH_USER_IMPORT_SUCCESS });
    yield put({ type: AC.GET_BRANCH_USERS, payload: { id: action.payload.id } });
  } catch (e) {
    yield put({ type: AC.BRANCH_USER_IMPORT_FAILED });
  }
}

// EXPORT BUSINESS USERS
function* exportBusinessUsers(action) {
  try {
    yield put({ type: AC.BUSINESS_USER_EXPORT_START });
    const { data } = yield UserApi.exportBusinessUsers(action.payload);
    yield put({ type: AC.BUSINESS_USER_EXPORT_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: AC.BUSINESS_USER_EXPORT_FAILED });
  }
}

// IMPORT BUSINESS USERS
function* importBusinessUsers(action) {
  try {
    yield put({ type: AC.BUSINESS_USER_IMPORT_START });
    yield UserApi.importBusinessUsers(action.payload);
    yield put({ type: AC.BUSINESS_USER_IMPORT_SUCCESS });
    yield put({ type: AC.GET_BUSINESS_USERS, payload: { id: action.payload.id } });
  } catch (e) {
    yield put({ type: AC.BUSINESS_USER_IMPORT_FAILED });
  }
}

// INVITE USERS
function* inviteUsers(action) {
  try {
    yield put({ type: AC.INVITE_USERS_START });
    UserApi.inviteUsers(action.payload);
    yield put({ type: AC.INVITE_USERS_SUCCESS });
  } catch (e) {
    yield put({ type: AC.INVITE_USERS_FAILED });
  }
}

// List of watchers
export const userSagas = [
  takeEvery(AC.LOGIN, login),
  takeEvery(AC.REGISTER, register),
  takeEvery(AC.ACTIVATE, activate),
  takeEvery(AC.FORGOT_PWD, forgotPwd),
  takeEvery(AC.RESET_PWD, resetPwd),
  takeEvery(AC.LOGOUT, logout),
  takeEvery(AC.GET_USER, getUser),
  takeEvery(AC.UPDATE_USER, updateUser),
  takeEvery(AC.UPLOAD_AVATAR, uploadAvatar),
  takeEvery(AC.REMOVE_AVATAR, removeAvatar),
  takeEvery(AC.UPLOAD_COVER, uploadCover),
  takeEvery(AC.USER_BUSINESS_FETCH, fetchBusinesses),
  takeEvery(AC.USER_LOGS_FETCH, fetchLogs),
  takeEvery(AC.CREATE_USER, createUser),
  takeEvery(AC.DELETE_USER, deleteUser),
  takeEvery(AC.USER_BRANCHES_UPDATE, updateBranches),
  takeEvery(AC.GET_COMPANY_USERS, getCompanyUsers),
  takeEvery(AC.GET_BRANCH_USERS, getBranchUsers),
  takeEvery(AC.GET_BUSINESS_USERS, getBusinessUsers),
  takeEvery(AC.COMPANY_USER_IMPORT, importCompanyUsers),
  takeEvery(AC.COMPANY_USER_EXPORT, exportCompanyUsers),
  takeEvery(AC.COMPANY_USER_DOWNLOAD_CSV_TEMPLATE, downloadCSVTemplate),
  takeEvery(AC.LOGIN_AS, loginAs),
  takeEvery(AC.SWITCH_USER, switchUser),
  takeEvery(AC.BRANCH_USER_IMPORT, importBranchUsers),
  takeEvery(AC.BRANCH_USER_EXPORT, exportBranchUsers),
  takeEvery(AC.BUSINESS_USER_EXPORT, exportBusinessUsers),
  takeEvery(AC.BUSINESS_USER_IMPORT, importBusinessUsers),
  takeEvery(AC.INVITE_USERS, inviteUsers),
];
