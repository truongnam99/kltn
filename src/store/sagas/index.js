import {all, takeLatest} from 'redux-saga/effects';

import * as types from '../actions/types';
import * as messageSagas from './messageSagas';
import * as roommateSagas from './roommateSagas';

export default function* rootSagas() {
  yield all([
    takeLatest(types.CHANGE_MESSAGE, messageSagas.watchMessage),
    takeLatest(types.FETCH_ROOMMATE, roommateSagas.fetchRoommate),
    takeLatest(types.FETCH_MY_POST, roommateSagas.fetchMyPost),
    takeLatest(types.POST_UPDATE_STATUS, roommateSagas.activedPost),
    takeLatest(types.ROOMMATE_CREATE_POST, roommateSagas.watchCreatePost),
  ]);
}
