/*
 * Reducer actions related with login
 */
import * as types from './types';
import {ILoginResponse} from '../../models/api/login';

export function requestLogin(username: string, password: string) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
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
