import firestore from '@react-native-firebase/firestore';
import {call, put, select} from 'redux-saga/effects';
import {
  ADD_LOGISTIC,
  ADD_MY_LOGISTIC,
  LOGISTIC_RELOAD_LIST,
  LOGISTIC_SET_END,
  LOGISTIC_SET_LAST,
  UPDATE_LOGISTIC,
  UPDATE_MY_LOGISTIC,
} from '../actions/types';

export function* fetchLogistic({type, payload}) {
  const {isEnd} = yield select(state => state.logisticReducer);

  if (isEnd && !payload.reload) {
    return;
  }
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
  if (payload.id) {
    yield updateLogisticInFirestore(payload);
    const {logistics, myLogistics} = yield select(
      state => state.logisticReducer,
    );
    if (logistics && logistics.length) {
      const index = logistics.findIndex(item => item.id === payload.id);
      if (index !== -1) {
        logistics.splice(index, 1, {...payload});
        yield put({type: UPDATE_LOGISTIC, payload: logistics});
      }
    }
    if (myLogistics && myLogistics.length) {
      const index = myLogistics.findIndex(item => item.id === payload.id);
      if (index !== -1) {
        myLogistics.splice(index, 1, {...payload});
        yield put({type: UPDATE_MY_LOGISTIC, payload: myLogistics});
      }
    }
  } else {
    const result = yield createLogisticInFirestore(payload);
    yield put({
      type: ADD_LOGISTIC,
      payload: {data: {id: result.id, ...payload}, setToFirst: true},
    });
  }
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
}
