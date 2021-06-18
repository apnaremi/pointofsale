import {takeEvery, all} from 'redux-saga/effects';
import * as types from '../actions/types';
import loginSaga, {updateAvatarSaga} from '../../../redux/user/saga';
import orderingSettingsSaga from '../../../redux/orderSettings/saga';

export default function* watch() {
  yield all([takeEvery(types.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(types.UPDATE_PROFILE_AVATAR_REQUEST, updateAvatarSaga)]);
  yield all([takeEvery(types.ORDERING_SETTINGS_REQUEST, orderingSettingsSaga)]);
}
