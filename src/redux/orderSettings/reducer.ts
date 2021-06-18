import createReducer from '../../config/redux/createReducer';
import * as types from '../../config/redux/actions/types';

import {IOrderingSettingsState} from '../../config/models/reducers';
import {IOrderingSettingsResponse} from '../../config/models/actions';
import {IOrderingSettings} from '../../config/models/data';
import {appLog} from '../../utils/helpers';

const initialState: IOrderingSettingsState = {
  OrderingSettings: {} as IOrderingSettings,
};

export const orderSettingsReducer = createReducer(initialState, {
  [types.ORDERING_SETTINGS_RESPONSE](
    state: IOrderingSettingsState,
    action: IOrderingSettingsResponse,
  ) {
    appLog('onSuccessSettings reducer', action.response);
    return {
      ...state,
      OrderingSettings: action.response,
    };
  },

  [types.BILL_NUMBERING_UPDATE](state: IOrderingSettingsState, action: any) {
    return {
      ...state,
      OrderingSettings: {
        ...state.OrderingSettings,
        orderSettings: {
          ...state.OrderingSettings.orderSettings,
          billNumbering: action.payload,
        },
      },
    };
  },
  [types.DELETE_SEATING_ARRANGEMENT](
    state: IOrderingSettingsState,
    action: any,
  ) {
    appLog('deleteSeatingArrangement redux', action);
    appLog(
      'deleteSeatingArrangement before',
      state.OrderingSettings.seatingArrangement,
    );
    appLog(
      'deleteSeatingArrangement redux',
      state.OrderingSettings.seatingArrangement.filter(
        item => item.id !== action.payload,
      ),
    );
    return {
      ...state,
      OrderingSettings: {
        ...state.OrderingSettings,
        seatingArrangement: state.OrderingSettings.seatingArrangement.filter(
          item => item.id !== action.payload,
        ),
      },
    };
  },
});
