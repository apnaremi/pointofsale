import createReducer from '../../config/redux/createReducer';
import * as types from '../../config/redux/actions/types';

import {
  ICategoryState,
  IOrderingSettingsState,
} from '../../config/models/reducers';
import {IOrderingSettingsResponse} from '../../config/models/actions';
import {ICategory, IOrderingSettings} from '../../config/models/data';
import {appLog} from '../../utils/helpers';

const initialState: ICategoryState = {
  categories: [] as Array<ICategory>,
};

export const categoriesReducer = createReducer(initialState, {
  [types.CATEGORIES_RESPONSE](
    state: ICategoryState,
    action: any,
  ) {
    appLog('categoriesReducer CATEGORIES_RESPONSE', action.response);
    return {
      ...state,
      categories: action.response,
    };
  },
});
