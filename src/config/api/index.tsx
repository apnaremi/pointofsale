// General api to access data
import axios from 'axios';
import ApiConstants from './ApiConstants';
import {appLog} from '../../utils/helpers';
import {getBuildNumber, getVersion} from 'react-native-device-info';
import {IS_IOS} from '../../utils/constants';

const API = axios.create({
  baseURL: ApiConstants.BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-cache',
    Platform: IS_IOS ? 'ios' : 'android',
    VersionNo: `${getVersion()}.${getBuildNumber()}`,
  },
});

API.defaults.timeout = 15000;

// Add a request interceptor
API.interceptors.request.use(
  config => {
    appLog('[Api - request]', config);
    return config;
  },
  error => {
    appLog('[Api - request error]', error);
    return Promise.reject(error);
  },
);

// Add a response interceptor
API.interceptors.response.use(
  response => {
    appLog('[Api - response]', response);
    return response;
  },
  error => {
    //appLog('[Api - response error]', error.toJSON());
    appLog('[Api - response error response]', error.response);
    return Promise.reject(error);
  },
);

export default API;

export const onFailure = (error: any) => {
  return {message: error.response.data.message, success: false};
};

export const onSuccessIsPassed = (response: any) => {
  if (
    response &&
    response.data &&
    response.data.isPassed &&
    response.status === 200
  ) {
    return {data: response.data, success: true};
  } else {
    let message = 'Internal server error, please try again later';
    if (response && response.data && response.data.message) {
      message = response.data.message;
    }
    return {data: message, success: false};
  }
};

export const onSuccess = (response: any) => {
  const responseData = response.data.data ? response.data.data : response;
  return {
    success: response.status === 200,
    message: response.data.message ? response.data.message : '',
    data: responseData,
  };
};
