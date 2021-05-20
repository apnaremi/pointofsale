import {put, call} from 'redux-saga/effects';
import {getSettings} from '../../api/orderingApi';
import {onOrderingSettingsResponse} from './actions';

import {IApiOrderingSettingsResponse} from '../../config/models/api';
import {appLog} from '../../utils/helpers';
import {IOrderingSettingsRequestState} from '../../config/models/actions';

export default function* orderingSettingsAsync(
  action: IOrderingSettingsRequestState,
) {
  const response: IApiOrderingSettingsResponse = yield call(
    getSettings,
    action.data.userId,
    action.data.companyId,
  );
  appLog('OrderingSettings saga', response);
  if (response.success) {
    action.onSuccess && action.onSuccess(response);
    if (response.data) {
      yield put(onOrderingSettingsResponse(response));
    }
  } else {
    action.onFailure && action.onFailure(response.message);
  }
}
