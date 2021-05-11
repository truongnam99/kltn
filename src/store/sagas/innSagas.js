import firestore from '@react-native-firebase/firestore';
import {call, put, select} from 'redux-saga/effects';
import {
  ADD_INN,
  INN_SHOW_LOADING,
  INN_RELOAD_LIST,
  SET_IS_END,
  INN_SET_lAST,
} from '../actions/types';

export function* fetchInn({type, payload}) {
  const {isLoading, isEnd} = yield select(state => state.innReducer);

  if ((isEnd || isLoading) && !payload.reload) {
    return;
  }
  yield put({type: INN_SHOW_LOADING, payload: true});
  if (payload.reload) {
    yield put({type: INN_RELOAD_LIST});
  }
  const data = yield call(fetchDataFromFirebase, payload);
  if (data.length === 0) {
    yield put({type: SET_IS_END, payload: true});
  } else {
    yield put({type: ADD_INN, payload: data});
  }
}

function* fetchDataFromFirebase({
  limit = 100,
  name,
  minPrice,
  maxPrice,
  city,
  district,
  address,
}) {
  const {last} = yield select(state => state.innReducer);
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
  query = query.orderBy('room_price');
  if (last) {
    query = query.startAfter(last);
  }
  const results = yield query.limit(limit).get();

  if (results.docs.length) {
    yield put({
      type: INN_SET_lAST,
      payload: results.docs[results.docs.length - 1],
    });
  }

  return results.docs.map(item => item.data());
}

export function* createInn({type, payload}) {
  yield put({type: INN_SHOW_LOADING, payload: true});
  yield createInnInFirebase(payload);
  yield put({type: INN_SHOW_LOADING, payload: false});
}

function* createInnInFirebase(data) {
  yield firestore()
    .collection('Inns')
    .add({...data, created_at: firestore.FieldValue.serverTimestamp()});
}
