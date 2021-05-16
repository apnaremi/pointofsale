/*
 * combines all th existing reducers
 */
import * as rootReducer from './rootReducer';
import * as loginReducer from '../../../redux/user/reducer';

export default Object.assign(loginReducer, rootReducer);
