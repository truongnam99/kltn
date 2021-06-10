import {all, takeLatest} from 'redux-saga/effects';

import * as types from '../actions/types';
import * as messageSagas from './messageSagas';

export default function* rootSagas() {
  yield all([takeLatest(types.CHANGE_MESSAGE, messageSagas.watchMessage)]);
}
