import {put, call} from 'redux-saga/effects';
import {loginApi, updateAvatarAPI} from '../../api/loginApi';
import * as loginActions from './actions';

import {ILoginResponse} from '../../config/models/api';
import {appLog} from '../../utils/helpers';
import {
  ILoginRequestState,
  IRequestAvatarState,
} from '../../config/models/actions';
import {onOrderingSettingsResponse} from '../orderSettings/actions';
import uploadImage from '../../utils/UploadImage';

export default function* loginAsync(action: ILoginRequestState) {
  const response: ILoginResponse = yield call(
    loginApi,
    action.data.username,
    action.data.password,
  );
  appLog('login saga', response);
  if (response.success) {
    action.onSuccess && action.onSuccess(response);
    if (response.token && response.data) {
      appLog('login saga', response);
      yield put(loginActions.onLoginResponse(response));
    }
  } else {
    action.onFailure && action.onFailure(response.message);
    yield put(loginActions.loginFailed());
  }
}

export function* updateAvatarSaga(action: IRequestAvatarState) {
  let userRes: any;
  if (action.data && action.data.isForDelete) {
    userRes = yield call(updateAvatarAPI, '', action.data.userId);
  } else {
    const mediasRes = yield call(
      uploadImage,
      action.data.image,
      action.data.userId,
    );
    userRes = yield call(updateAvatarAPI, mediasRes.url, action.data.userId);
  }

  if (userRes.success) {
    action.onSuccess && action.onSuccess(userRes);
    if (userRes.data) {
      //yield put(onOrderingSettingsResponse(response));
      //yield put(UserActions.updateUserSuccess(userRes));
    }
  } else {
    action.onFailure && action.onFailure(userRes.message);
  }
}
