import API, {onFailure} from '../config/api';
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
