import firestore from '@react-native-firebase/firestore';
import {call, put, select} from 'redux-saga/effects';
import {ADD_INN, INN_SHOW_LOADING} from '../actions/types';

export function* fetchInn({type, payload}) {
  yield put({type: INN_SHOW_LOADING, payload: true});
  const data = yield call(fetchDataFromFirebase, payload);
  yield put({type: ADD_INN, payload: data});
}

function* fetchDataFromFirebase(offset) {
  const {inns} = yield select(state => state.innReducer);
  let lastId = null;
  if (inns.length) {
    lastId = inns[inns.length - 1]._id;
  }
  const results = yield firestore()
    .collection('Inns')
    .orderBy('_id')
    .startAfter(lastId)
    .limit(10)
    .get();
  return results.docs.map(item => item.data());
}
