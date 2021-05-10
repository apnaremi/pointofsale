/*
 * Reducer actions related with login
 */
import * as types from './types';
import {ILoginResponse} from '../../models/api/login';

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
