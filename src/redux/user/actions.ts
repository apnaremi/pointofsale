import * as types from '../../config/redux/actions/types';
import {ILoginResponse} from '../../config/models/api';
import API from '../../config/api';
import {appLog} from '../../utils/helpers';

export function requestLogin(
  data: {username: string; password: string},
  onSuccess: Function,
  onFailure: Function,
) {
  return {
    type: types.LOGIN_REQUEST,
    data,
    onSuccess,
    onFailure,
  };
}

export function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

export function onLoginResponse(response: ILoginResponse) {
  appLog('login action onLoginResponse', response);
  API.defaults.headers = {
    Authorization: `Bearer ${response.token.access_token}`,
  };
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}

export function updateProfile(response: ILoginResponse) {
  return {
    type: types.UPDATE_PROFILE,
    response,
  };
}

export function requestUpdateAvatar(
  data: {userId: string; image: any; isForDelete: boolean},
  onSuccess: Function,
  onFailure: Function,
) {
  return {
    type: types.UPDATE_PROFILE_AVATAR_REQUEST,
    data,
    onSuccess,
    onFailure,
  };
}
