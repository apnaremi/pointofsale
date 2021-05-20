import {takeEvery, all} from 'redux-saga/effects';
import * as types from '../actions/types';
import loginSaga from '../../../redux/user/saga';
import orderingSettingsSaga from '../../../redux/orderSettings/saga';

export default function* watch() {
  yield all([takeEvery(types.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(types.ORDERING_SETTINGS_REQUEST, orderingSettingsSaga)]);
}
