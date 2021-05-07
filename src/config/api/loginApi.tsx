import API, {onFailure} from '../../config/api';
import ApiConstants from '../../config/api/ApiConstants';
// import {getUniqueId} from 'react-native-device-info';
import {appLog} from '../../utils/helpers';

export default function loginApi(userName: string, password: string) {
  const data = {
    // device_id: getUniqueId(),
    device_id: 'a22c428079a09fe7',
    grant_type: 'password',
    password: password,
    username: userName,
  };

  appLog('parse', data);
  return API.post(ApiConstants.LOGIN, data).then(onSuccess).catch(onFailure);
}

export const onSuccess = (response: any) => {
  return {
    token: response.data.data.token.access_token
      ? response.data.data.token.access_token
      : '',
    user: response.data.data.user ? response.data.data.user : '',
    success: response.status === 200,
  };
};
