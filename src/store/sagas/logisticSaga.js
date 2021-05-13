import firestore from '@react-native-firebase/firestore';
import {call, put, select} from 'redux-saga/effects';
import {
  ADD_LOGISTIC,
  ADD_MY_LOGISTIC,
  LOGISTIC_IS_LOADING,
  LOGISTIC_RELOAD_LIST,
  LOGISTIC_SET_END,
  LOGISTIC_SET_LAST,
} from '../actions/types';

export function* fetchLogistic({type, payload}) {
  const {isLoading, isEnd} = yield select(state => state.logisticReducer);

  if ((isEnd || isLoading) && !payload.reload) {
    return;
  }
  yield put({type: LOGISTIC_IS_LOADING, payload: true});
  if (payload.reload) {
    yield put({type: LOGISTIC_RELOAD_LIST});
  }
  const data = yield call(fetchDataFromFirebase, payload);
  if (data.length === 0) {
    yield put({type: LOGISTIC_SET_END, payload: true});
  } else {
    yield put({type: ADD_LOGISTIC, payload: data});
  }
}

function* fetchDataFromFirebase({limit = 8, cityId, districtId}) {
  const {last} = yield select(state => state.logisticReducer);
  let query = firestore().collection('Logistics');

  if (last) {
    query = query.startAfter(last);
  }
  if (cityId) {
    query = query.where('full_address_object.city.code', '==', cityId);
  }
  if (districtId) {
    query = query.where('full_address_object.district.code', '==', +districtId);
  }

  const results = yield query.limit(limit).get();
  if (results.docs.length) {
    yield put({
      type: LOGISTIC_SET_LAST,
      payload: results.docs[results.docs.length - 1],
    });
  }
  return results.docs.map(item => item.data());
}

export function* createLogistic({type, payload}) {
  yield put({type: LOGISTIC_IS_LOADING, payload: true});
  if (payload.id) {
    yield updateLogisticInFirestore(payload);
  } else {
    yield createLogisticInFirestore(payload);
  }
  yield put({type: LOGISTIC_IS_LOADING, payload: false});
}

function* createLogisticInFirestore({id, ...payload}) {
  return yield firestore()
    .collection('Logistics')
    .add({
      ...payload,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

function* updateLogisticInFirestore({id, ...payload}) {
  return yield firestore()
    .collection('Logistics')
    .doc(id)
    .update({
      ...payload,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
}

export function* fetchMyLogistic() {
  yield put({type: LOGISTIC_IS_LOADING, payload: true});
  const {uid} = yield select(state => state.userReducer.userCredential) || {};
  if (uid) {
    const result = yield firestore()
      .collection('Logistics')
      .where('owner.uid', '==', uid)
      .get();
    yield put({
      type: ADD_MY_LOGISTIC,
      payload: result.docs.map(item => {
        return {id: item.id, ...item.data()};
      }),
    });
  }
  yield put({type: LOGISTIC_IS_LOADING, payload: false});
}
