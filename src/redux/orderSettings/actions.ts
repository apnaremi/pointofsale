import * as types from '../../config/redux/actions/types';
import {IApiOrderingSettingsResponse} from '../../config/models/api';
import {appLog} from '../../utils/helpers';

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

export function updateBillNumbering(billNumbering: number) {
  appLog('updateBillNumbering', billNumbering);
  return {
    type: types.BILL_NUMBERING_UPDATE,
    payload: billNumbering,
  };
}

export function deleteSeatingArrangementAction(SeatingArrangementId: number) {
  appLog('deleteSeatingArrangement action', SeatingArrangementId);
  return {
    type: types.DELETE_SEATING_ARRANGEMENT,
    payload: SeatingArrangementId,
  };
}
