import {takeEvery, all, put, takeLatest} from 'redux-saga/effects';

import * as types from '../actions/types';
import * as innSagas from './innSagas';
import * as logisticSagas from './logisticSaga';
import * as messageSagas from './messageSagas';

export default function* rootSagas() {
  yield all([
    takeEvery(types.FETCH_INN, innSagas.fetchInn),
    takeEvery(types.FETCH_LOGISTIC, logisticSagas.fetchLogistic),
    takeEvery(types.CHANGE_MESSAGE, messageSagas.watchMessage),
  ]);
}
