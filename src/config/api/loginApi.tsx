import API, {onFailure, onSuccess} from '../../config/api';
import ApiConstants from '../../config/api/ApiConstants';
import {getUniqueId} from 'react-native-device-info';
import {ILoginResponse} from '../models/api/login';

export function loginApi(userName: string, password: string) {
  const data = {
    device_id: getUniqueId(),
    // device_id: 'a22c428079a09fe7',
    grant_type: 'password',
    password: password,
    username: userName,
  };
  return API.post(ApiConstants.LOGIN, data)
    .then(onSuccessLogin)
    .catch(onFailure);
}

export const onSuccessLogin = (response: any) => {
  const responseData = response.data.data ? response.data.data : response;
  let returnData: ILoginResponse = {
    success: response.status === 200,
    message: response.data.message ? response.data.message : '',
    tfaRequired: responseData.tfaRequired,
    tfaToken: responseData.tfaToken,
    tfaUserId: responseData.tfaUserId,
    token: responseData.token,
    user: responseData.user,
  };

  return returnData;
};

export function pwsRecoveryApi(email: string) {
  const data = {
    email: email,
  };
  return API.post(ApiConstants.FORGET_PASSWORD, data)
    .then(onSuccess)
    .catch(onFailure);
}
