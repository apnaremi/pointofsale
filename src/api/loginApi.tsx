import API, {onFailure, onSuccess} from '../config/api';
import ApiConstants from '../config/api/ApiConstants';
import {getUniqueId} from 'react-native-device-info';
import {ILoginResponse} from '../config/models/api';
import {UNIQUE_ID_DEV} from '../utils/constants';
import {appLog} from '../utils/helpers';

export function loginApi(userName: string, password: string) {
  const data = {
    device_id: __DEV__ ? UNIQUE_ID_DEV : getUniqueId(),
    grant_type: 'password',
    password: password,
    username: userName,
  };
  return API.post(ApiConstants.LOGIN, data)
    .then(onSuccessLogin)
    .catch(onFailure);
}

export const onSuccessLogin = (response: any) => {
  appLog('onSuccessLogin', response);
  const responseData = response.data.data ? response.data.data : response;
  let returnData: ILoginResponse = {
    success: response.status === 200,
    message: response.data.message ? response.data.message : '',
    tfaRequired: responseData.tfaRequired,
    tfaToken: responseData.tfaToken,
    tfaUserId: responseData.tfaUserId,
    token: responseData.token,
    data: responseData.user,
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

export function loginTFAApi(
  code: string,
  token: string,
  deviceId: string,
  userId: string,
) {
  let data = {
    code: code,
    token: token,
    deviceId: deviceId,
    userId: userId,
  };
  return API.post(ApiConstants.CODE_VERIFY, data)
    .then(onSuccessLogin)
    .catch(onFailure);
}

export function sendVerifyCode(
  token: string,
  deviceId: string,
  userId: string,
) {
  let data = {
    token: token,
    deviceId: deviceId,
    userId: userId,
  };
  return API.post(ApiConstants.RESEND_CODE_VERIFY, data)
    .then(onSuccess)
    .catch(onFailure);
}

export function updateAvatarAPI(photoUrl: string, userId: string) {
  const data = {
    userId,
    photoUrl,
  };
  return API.put(`/api/accounts/${userId}/updateavatar`, data)
    .then(onSuccess)
    .catch(onFailure);
}

// export function loginPIN(data) {
//   return post('/api/token/pin', data);
// }

export function createPINAPI(pin: string, userId: string) {
  const data = {
    pin: pin,
    deviceId: __DEV__ ? UNIQUE_ID_DEV : getUniqueId(),
    userId: userId,
  };
  return API.post('/api/accounts/pin', data).then(onSuccess).catch(onFailure);
}

// export async function changePIN(data) {
//   return put('/api/accounts/pin', data);
// }
//
// export async function deletePIN() {
//   return del('/api/accounts/pin');
// }

export function deletePINAPI() {
  return API.delete('/api/accounts/pin').then(onSuccess).catch(onFailure);
}

export function loginPINApi(pin: string, userId: string) {
  const data = {
    pin: pin,
    deviceId: __DEV__ ? UNIQUE_ID_DEV : getUniqueId(),
    userId: userId,
  };
  return API.post('/api/token/pin', data).then(onSuccessLogin).catch(onFailure);
}
