import firestore from '@react-native-firebase/firestore';
import {call, put, select} from 'redux-saga/effects';
import {
  ADD_ROOMMATE,
  ROOMMATE_IS_LOADING,
  ROOMMATE_RELOAD_LIST,
  ROOMMATE_SET_END,
  ROOMMATE_SET_LAST,
} from '../actions/types';

export function* fetchRoommate({type, payload}) {
  const {isLoading, isEnd} = yield select(state => state.roommateReducer);

  if ((isEnd || isLoading) && !payload.reload) {
    return;
  }
  yield put({type: ROOMMATE_IS_LOADING, payload: true});
  if (payload.reload) {
    yield put({type: ROOMMATE_RELOAD_LIST});
  }
  const data = yield call(fetchDataFromFirebase, payload);
  if (data.length === 0) {
    yield put({type: ROOMMATE_SET_END, payload: true});
    return;
  }
  yield put({type: ADD_ROOMMATE, payload: data});
}

function* fetchDataFromFirebase({limit = 6, cityId, districtId, isMe}) {
  const {last} = yield select(state => state.roommateReducer);
  const {uid} = yield select(state => state.userReducer.userInfo);
  let query = firestore().collection('Roommates').where('isActive', '==', true);

  if (last) {
    query = query.startAfter(last);
  }
  if (cityId) {
    query = query.where('city.Id', '==', cityId);
  }
  if (districtId) {
    query = query.where('district.Id', '==', districtId);
  }
  if (isMe) {
    query = query.where('owner.uid', '==', uid);
  }
  const results = yield query.limit(limit).get();
  if (results.docs.length) {
    yield put({
      type: ROOMMATE_SET_LAST,
      payload: results.docs[results.docs.length - 1],
    });
  }
  return results.docs.map(item => {
    return {
      id: item.id,
      ...item.data(),
    };
  });
}
