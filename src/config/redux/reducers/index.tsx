/*
 * combines all th existing reducers
 */
import * as rootReducer from './rootReducer';
import * as loginReducer from '../../../redux/user/reducer';
import * as orderSettingsReducer from '../../../redux/orderSettings/reducer';
import * as categoriesReducer from '../../../redux/categories/reducer';

export default Object.assign(loginReducer, rootReducer, orderSettingsReducer, categoriesReducer);
