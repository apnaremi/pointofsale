import {put, call} from 'redux-saga/effects';
import {loginApi} from '../../api/loginApi';
import * as loginActions from './actions';

import {ILoginResponse} from '../../config/models/api';
import {appLog} from '../../utils/helpers';
import {ILoginRequestState} from '../../config/models/actions';

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
