/*
 * combines all th existing reducers
 */
import * as rootReducer from './rootReducer';
import * as loginReducer from './loginReducer';

export default Object.assign(loginReducer, rootReducer);