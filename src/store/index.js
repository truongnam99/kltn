import {createStore, compose, applyMiddleware} from 'redux';

import createSagaMiddleware from 'redux-saga';
import allReducers from './reducers';
import sagas from './sagas';
import * as housewareSagas from './sagas/housewareSaga';
import * as innSagas from './sagas/innSagas';
import * as logisticSagas from './sagas/logisticSaga';
import * as roommateSagas from './sagas/roommateSagas';
import * as userSagas from './sagas/userSagas';
import * as globalSagas from './sagas/globalSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
const configureStore = () => {
  return store;
};

const saga = {
  ...housewareSagas,
  ...innSagas,
  ...logisticSagas,
  ...roommateSagas,
  ...userSagas,
  ...globalSagas,
};

for (let a in saga) {
  sagaMiddleware.run(saga[a]);
}
sagaMiddleware.run(sagas);

export default configureStore;
