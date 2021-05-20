import createReducer from '../../config/redux/createReducer';
import * as types from '../../config/redux/actions/types';

import {IOrderingSettingsState} from '../../config/models/reducers';
import {IOrderingSettingsResponse} from '../../config/models/actions';
import {IOrderingSettings} from '../../config/models/data';

const initialState: IOrderingSettingsState = {
  OrderingSettings: {} as IOrderingSettings,
};

export const orderSettingsReducer = createReducer(initialState, {
  [types.ORDERING_SETTINGS_RESPONSE](
    state: IOrderingSettingsState,
    action: IOrderingSettingsResponse,
  ) {
    return {
      ...state,
      OrderingSettings: action.response,
    };
  },
});
