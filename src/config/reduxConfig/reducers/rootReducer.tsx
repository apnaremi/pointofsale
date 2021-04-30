/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from '../../../utils/createReducer';
import * as types from '../actions/types';

const initialState = {
  isWorking: false,
  isModalVisible: false,
  message: '',
  isError: false,
};

export const rootReducer = createReducer(initialState, {
  [types.ENABLE_LOADER](state: any, action: any) {
    return {...state, isWorking: action.enable};
  },
  [types.ENABLE_MODAL](
    state: any,
    action: {message: string; isError: boolean},
  ) {
    return {
      ...state,
      isModalVisible: true,
      message: action.message,
      isError: action.isError,
    };
  },
  [types.DISABLE_MODAL](state: any) {
    return {...state, isModalVisible: false};
  },
});
