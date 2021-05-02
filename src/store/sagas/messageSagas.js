import {put} from 'redux-saga/effects';
import {SET_CHANGE_MESSAGES} from '../actions/types';

export function* watchMessage({type, payload}) {
  const data = payload.map(item => {
    return {
      [item.doc.id]: item.doc.data(),
    };
  });
  yield put({type: SET_CHANGE_MESSAGES, payload: data});
}
