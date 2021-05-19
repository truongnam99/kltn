import {all} from '@redux-saga/core/effects';
import {createStore, compose, applyMiddleware} from 'redux';

import createSagaMiddleware from 'redux-saga';
import allReducers from './reducers';
import sagas from './sagas';
import * as housewareSagas from './sagas/housewareSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
const configureStore = () => {
  return store;
};

const houseware = {
  ...housewareSagas,
};

for (let a in houseware) {
  sagaMiddleware.run(houseware[a]);
}

sagaMiddleware.run(sagas);

export default configureStore;
