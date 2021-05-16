import {put, call} from 'redux-saga/effects';
import {loginApi} from '../../api/loginApi';
import * as loginActions from './actions';

import {ILoginResponse} from '../../config/models/api/login';
import {appLog} from '../../utils/helpers';
import {ILoginRequestState} from '../../config/models/actions/login';

export default function* loginAsync(action: ILoginRequestState) {
  const response: ILoginResponse = yield call(
    loginApi,
    action.data.username,
    action.data.password,
  );
  appLog('login saga', response);
  appLog('ILoginResponse', response);
  if (response.success) {
    action.onSuccess && action.onSuccess(response);
    if (response.token && response.user) {
      yield put(loginActions.onLoginResponse(response));
    }
  } else {
    action.onFailure && action.onFailure(response.message);
    yield put(loginActions.loginFailed());
  }
}
