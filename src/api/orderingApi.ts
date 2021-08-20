import API, {onFailure, onSuccess} from '../config/api';
import ApiConstants from '../config/api/ApiConstants';
import {appLog} from '../utils/helpers';
import {IApiOrderingSettingsResponse} from '../config/models/api';
import {IOrderingSettings} from '../config/models/data';

export function getSettings(userId: string, companyId: string) {
  return API.get(ApiConstants.ORDERING_SETTINGS, {
    params: {
      userId,
      companyId,
    },
  })
    .then(onSuccessSettings)
    .catch(onFailure);
}

export const onSuccessSettings = (response: any) => {
  appLog('onSuccessSettings', response);
  const responseData = response.data.data ? response.data.data : response;
  appLog('onSuccessSettings', responseData);
  let returnData: IApiOrderingSettingsResponse = {
    success: response.status === 200,
    message: response.data.message ? response.data.message : '',
    data: responseData as IOrderingSettings,
  };
  appLog('onSuccessSettings', returnData);
  return returnData;
};

export function getMenuItems(userId: string, companyId: string) {
  return API.get(ApiConstants.INVOICE_ITEMS, {
    params: {
      pageSize: 1000,
      id: companyId,
      userId,
    },
  })
    .then(onSuccessSettings)
    .catch(onFailure);
}

export function getCustomers(userId: string, companyId: string) {
  return API.get(ApiConstants.INVOICE_CUSTOMERS, {
    params: {
      pageSize: 1000,
      id: companyId,
      userId,
    },
  })
    .then(onSuccessSettings)
    .catch(onFailure);
}

export function saveCustomer(userId: string, data: any) {
  let URL = `${ApiConstants.INVOICE_CUSTOMERS}?userId=${userId}`;
  return API.post(URL, data).then(onSuccessSettings).catch(onFailure);
}

export function saveOrderApi(userId: string, data: any) {
  let URL = `${ApiConstants.ORDERING}?userId=${userId}`;
  return API.post(URL, data).then(onSuccessSettings).catch(onFailure);
}

export function getOrdersApi(
  userId: string,
  id: string,
  year: string,
  date: string,
) {
  return API.get(ApiConstants.ORDERING, {
    params: {
      id,
      userId,
      year,
      date,
    },
  })
    .then(onSuccessSettings)
    .catch(onFailure);
}

export function saveOrderStatus(orderId: string, userId: string) {
  let URL = `${ApiConstants.ORDERING}${'/'}${orderId}`;
  return API.patch(URL, {
    userId: userId,
  })
    .then(onSuccess)
    .catch(onFailure);
}

export function getOrdersReportApi(params: any) {
  let URL = `${ApiConstants.ORDERING}${'/summary'}`;
  return API.get(URL, {
    params,
  })
    .then(onSuccessSettings)
    .catch(onFailure);
}
