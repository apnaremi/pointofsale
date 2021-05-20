import createReducer from '../../config/redux/createReducer';
import * as types from '../../config/redux/actions/types';

import {ILoginState} from '../../config/models/reducers';
import {ILoginResponseState} from '../../config/models/actions';
import {IUser} from '../../config/models/data';
import {appLog} from '../../utils/helpers';

const initialState: ILoginState = {
  isLoggedIn: false,
  user: {} as IUser,
  username: '',
  password: '',
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_LOADING_ENDED](state: ILoginState) {
    return {...state};
  },
  [types.LOGIN_RESPONSE](state: ILoginState, action: ILoginResponseState) {
    appLog('login reducer', action);
    return {
      ...state,
      user: action.response.data,
      isLoggedIn: true,
    };
  },
  [types.LOGIN_FAILED](state: ILoginState) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.LOG_OUT](state: ILoginState) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.UPDATE_PROFILE](state: ILoginState, action: ILoginResponseState) {
    appLog('ILoginResponseState', action);
    return {
      ...state,
      user: action.response.data,
      isLoggedIn: true,
    };
  },
});
