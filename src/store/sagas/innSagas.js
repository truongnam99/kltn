import firestore from '@react-native-firebase/firestore';
import {call, put, select} from 'redux-saga/effects';
import {
  ADD_INN,
  INN_SHOW_LOADING,
  REMOVE_ALL_INN,
  SET_IS_END,
} from '../actions/types';

export function* fetchInn({type, payload}) {
  const {isLoading, isEnd} = yield select(state => state.innReducer);

  if (isEnd || isLoading) {
    return;
  }
  yield put({type: INN_SHOW_LOADING, payload: true});
  if (payload.reload) {
    yield put({type: REMOVE_ALL_INN});
  }
  const data = yield call(fetchDataFromFirebase, payload);
  if (data.length === 0) {
    yield put({type: SET_IS_END, payload: true});
  }
  yield put({type: ADD_INN, payload: data});
}

function* fetchDataFromFirebase({
  limit = 10,
  name,
  minPrice,
  maxPrice,
  city,
  district,
  address,
}) {
  const {inns} = yield select(state => state.innReducer);
  let lastId = null;
  if (inns.length) {
    lastId = inns[inns.length - 1]._id;
  }
  let query = firestore().collection('Inns');
  if (name) {
    query = query.where(
      'room_name',
      'array-contains',
      name.toLocaleLowerCase(),
    );
  }
  if (address) {
    query = query.where(
      'exact_room_address',
      'array-contains',
      address.toLocaleLowerCase(),
    );
  }
  if (maxPrice && maxPrice < 10000000) {
    query = query.where('room_price', '<=', maxPrice);
  }
  if (minPrice && minPrice > 0) {
    query = query.where('room_price', '>=', minPrice);
  }
  if (city) {
    query = query.where('full_address_object.city.code', '==', city);
  }
  if (district) {
    query = query.where('full_address_object.district.code', '==', district);
  }
  const results = yield query
    .orderBy('room_price')
    .orderBy('_id')
    .startAfter(lastId)
    .limit(limit)
    .get();

  return results.docs.map(item => item.data());
}

export function* createInn({type, payload}) {
  yield put({type: INN_SHOW_LOADING, payload: true});
  yield createInnInFirebase(payload);
  yield put({type: INN_SHOW_LOADING, payload: false});
}

function* createInnInFirebase(data) {
  yield firestore().collection('Inns').add(data);
}
