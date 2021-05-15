import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {call, put, select} from 'redux-saga/effects';
import {translate} from '../../constants/translate';
import {
  ADD_MY_POST,
  ADD_ROOMMATE,
  ROOMMATE_IS_LOADING,
  ROOMMATE_RELOAD_LIST,
  ROOMMATE_SET_END,
  ROOMMATE_SET_LAST,
  UPDATE_MY_POST,
  UPDATE_POST,
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

function* fetchDataFromFirebase({limit = 10, cityId, districtId}) {
  const {last} = yield select(state => state.roommateReducer);

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

export function* fetchMyPost() {
  const {uid} = yield select(state => state.userReducer.userInfo);
  const results = yield firestore()
    .collection('Roommates')
    .where('owner.uid', '==', uid)
    .get();
  const data = results.docs.map(item => {
    return {
      id: item.id,
      ...item.data(),
    };
  });
  yield put({type: ADD_MY_POST, payload: data});
}

export function* activedPost({type, payload}) {
  yield firestore().collection('Roommates').doc(payload).update({
    isActive: false,
  });
  const {myPost, roommates} = yield select(state => state.roommateReducer);
  if (myPost && myPost.length) {
    const updatePostIndex = myPost.findIndex(item => item.id === payload);
    if (updatePostIndex !== -1) {
      myPost.splice(updatePostIndex, 1, {
        ...myPost[updatePostIndex],
        isActive: false,
      });
      yield put({
        type: UPDATE_MY_POST,
        payload: myPost,
      });
    }
  }
  if (roommates && roommates.length) {
    const roommateIndex = roommates.findIndex(item => item.id === payload);
    roommates.splice(roommateIndex, 1);
    if (roommateIndex !== -1) {
      yield put({
        type: UPDATE_POST,
        payload: roommates,
      });
    }
  }
}

export function* watchCreatePost({type, payload}) {
  try {
    yield put({type: ROOMMATE_IS_LOADING, payload: true});
    const result = yield firestore()
      .collection('Roommates')
      .add({
        ...payload,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    yield put({
      type: ADD_ROOMMATE,
      payload: [
        {
          id: result.id,
          ...payload,
        },
      ],
    });
    yield put({type: ROOMMATE_IS_LOADING, payload: false});
  } catch (error) {
    Alert.alert(translate.roommate.post, 'Lỗi: ' + error.message);
  }
}
