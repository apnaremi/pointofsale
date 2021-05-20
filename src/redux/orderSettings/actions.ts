import * as types from '../../config/redux/actions/types';
import {IApiOrderingSettingsResponse} from '../../config/models/api';

export function requestOrderingSettings(
  data: {userId: string; companyId: string},
  onSuccess: Function,
  onFailure: Function,
) {
  return {
    type: types.ORDERING_SETTINGS_REQUEST,
    data,
    onSuccess,
    onFailure,
  };
}

export function onOrderingSettingsResponse(
  response: IApiOrderingSettingsResponse,
) {
  return {
    type: types.ORDERING_SETTINGS_RESPONSE,
    response: response.data,
  };
}
