import {createStore, compose, applyMiddleware} from 'redux';

import createSagaMiddleware from 'redux-saga';
import allReducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
const configureStore = () => {
  return store;
};
sagaMiddleware.run(sagas);

export default configureStore;
