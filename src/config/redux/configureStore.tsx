import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducers from './reducers';

import sagas from './sagas';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['rootReducer'], // only  will be persisted
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

//const reducers = combineReducers(rootReducers);
const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const store = createStore(reducers, undefined, compose(...enhancers));
let persistor = persistStore(store);
const configureStore = () => {
  return {persistor, store};
};

sagaMiddleware.run(sagas);

export default configureStore;
