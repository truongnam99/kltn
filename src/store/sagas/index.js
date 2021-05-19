import {takeEvery, all} from 'redux-saga/effects';

import * as types from '../actions/types';
import * as innSagas from './innSagas';
import * as logisticSagas from './logisticSaga';
import * as messageSagas from './messageSagas';
import * as roommateSagas from './roommateSagas';
import * as housewareSagas from './housewareSaga';

export default function* rootSagas() {
  yield all([
    takeEvery(types.FETCH_INN, innSagas.fetchInn),
    takeEvery(types.FETCH_LOGISTIC, logisticSagas.fetchLogistic),
    takeEvery(types.CHANGE_MESSAGE, messageSagas.watchMessage),
    takeEvery(types.FETCH_ROOMMATE, roommateSagas.fetchRoommate),
    takeEvery(types.CREATE_INN, innSagas.createInn),
    takeEvery(types.FETCH_MY_INN, innSagas.fetchMyInn),
    takeEvery(types.CREATE_LOGISTIC, logisticSagas.createLogistic),
    takeEvery(types.FETCH_MY_LOGISTIC, logisticSagas.fetchMyLogistic),
    takeEvery(types.FETCH_MY_POST, roommateSagas.fetchMyPost),
    takeEvery(types.POST_UPDATE_STATUS, roommateSagas.activedPost),
    takeEvery(types.ROOMMATE_CREATE_POST, roommateSagas.watchCreatePost),
    // ...housewareSaga,
  ]);
  // for (let housewareSaga of housewareSagas) {
  //   housewareSaga();
  // }
}
