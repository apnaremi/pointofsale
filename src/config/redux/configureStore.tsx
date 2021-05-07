import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './reducers';

import sagas from './sagas';

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const reducers = combineReducers(rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const store = createStore(reducers, undefined, compose(...enhancers));

const configureStore = () => {
  return {store};
};

sagaMiddleware.run(sagas);

export default configureStore;
