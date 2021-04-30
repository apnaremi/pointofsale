// General api to access data
import axios from 'axios';
import ApiConstants from './ApiConstants';
import {appLog} from '../../utils/helpers';

const API = axios.create({
  baseURL: ApiConstants.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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
    appLog('[Api - response]', error.toJSON());
    return Promise.reject(error);
  },
);

export default API;

export const onFailure = (error: any) => {
  return {data: error.message, success: false};
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
  return {data: response.data, success: response.status === 200};
};
