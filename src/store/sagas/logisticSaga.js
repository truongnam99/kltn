import firestore from '@react-native-firebase/firestore';
import {call, put, select} from 'redux-saga/effects';
import {
  ADD_LOGISTIC,
  LOGISTIC_IS_LOADING,
  LOGISTIC_RELOAD_LIST,
  LOGISTIC_SET_END,
} from '../actions/types';

export function* fetchLogistic({type, payload}) {
  const {isLoading, isEnd} = yield select(state => state.logisticReducer);

  if (isEnd || isLoading) {
    return;
  }
  yield put({type: LOGISTIC_IS_LOADING, payload: true});
  if (payload.reload) {
    yield put({type: LOGISTIC_RELOAD_LIST});
  }
  const data = yield call(fetchDataFromFirebase, payload);
  if (data.length === 0) {
    yield put({type: LOGISTIC_SET_END, payload: true});
  }
  yield put({type: ADD_LOGISTIC, payload: data});
}

function* fetchDataFromFirebase({limit = 10}) {
  const {logistics} = yield select(state => state.logisticReducer);
  let lastId = null;
  if (logistics.length) {
    lastId = logistics[logistics.length - 1]._id;
  }
  let query = firestore().collection('Logistics');

  const results = yield query
    .orderBy('_id')
    .startAfter(lastId)
    .limit(limit)
    .get();

  return results.docs.map(item => item.data());
}
