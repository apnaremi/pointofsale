import {put, call} from 'redux-saga/effects';
import loginApi from '../../api/loginApi';
import * as loginActions from '../actions/loginActions';
import * as navigationActions from '../../../navigation/actions';

import API from '../../api';
import {ILoginResponse} from '../../models/api/login';
import {appLog} from '../../../utils/helpers';
import {ILoginRequestState} from '../../models/actions/login';

export default function* loginAsync(action: ILoginRequestState) {
  // yield put(loginActions.enableLoader(true));
  const response: ILoginResponse = yield call(
    loginApi,
    action.username,
    action.password,
  );
  // yield put(loginActions.enableLoader(false));
  appLog('ILoginResponse', response);
  if (response.token) {
    yield call(navigationActions.navigateToHome);
    yield put(loginActions.onLoginResponse(response));
    API.defaults.headers = {
      Authorization: `Bearer ${response.token}`,
    };
  } else {
    appLog('response', response);
    yield put(loginActions.loginFailed());
  }
}
