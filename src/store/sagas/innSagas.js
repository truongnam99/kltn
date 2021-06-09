import {produce} from 'immer';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  createInnInAlgolia,
  createInnInFirebase,
  updateInnInAlgolia,
  updateInnInFirebase,
  fetchDataFromFirebase,
  fetchDataFromAlgolia,
  fetchMyInn as fetchMyInnService,
  deleteInnInFirebase,
  deleteInnInAlgolia,
} from '../../service/innService';
import {showMessageFail, showMessageSuccess} from '../../utils/utils';
import {
  createInnFail,
  createInnSuccess,
  fetchInnFail,
  fetchInnSuccess,
  reloadInn,
  setEnd,
  setLast,
  fecthMyInnFail,
  fecthMyInnSuccess,
  updateInns,
  updateMyInns,
  deleteInnSuccess,
  deleteInnFail,
} from '../actions/innAction';
import {
  CREATE_INN,
  DELETE_INN,
  FETCH_INN,
  FETCH_MY_INN,
} from '../actions/types';

export function* fetchInnWatcher() {
  yield takeLatest(FETCH_INN, fetchInnTask);
}

function* fetchInnTask({type, payload}) {
  try {
    const {isEnd, count, last} = yield select(state => state.innReducer);

    if (isEnd && !payload.reload) {
      yield put(fetchInnSuccess([]));
      return;
    }
    if (payload.reload) {
      yield put(reloadInn());
    }
    let data = null;
    if (
      payload.searchText ||
      payload.minArea ||
      payload.maxArea ||
      payload.typeOfItem === 'map'
    ) {
      const {hits} = yield call(fetchDataFromAlgolia, {...payload, count});
      data = hits;
    } else {
      const result = yield call(fetchDataFromFirebase, {...payload, last});
      if (result.docs.length) {
        yield put(setLast(result.docs[result.docs.length - 1]));
      }
      data = result.docs.map(item => ({
        uid: item.id,
        ...item.data(),
      }));
    }
    yield put(fetchInnSuccess(data));
    if (data.length < payload.limit) {
      yield put(setEnd(true));
    }
  } catch (error) {
    console.log('error: ', error);

    yield put(fetchInnFail('Lỗi lấy dữ liệu phòng trọ'));
    showMessageFail('Lỗi lấy dữ liệu phòng trọ');
  }
}

export function* fetchMyInnWatcher() {
  yield takeLatest(FETCH_MY_INN, fetchMyInnTask);
}

function* fetchMyInnTask() {
  try {
    const {uid} = yield select(state => state.userReducer.userCredential);
    const results = yield call(fetchMyInnService, {uid});
    const data = results.docs.map(item => ({uid: item.id, ...item.data()}));
    yield put(fecthMyInnSuccess(data));
  } catch (error) {
    yield put(fecthMyInnFail(error.message));
    console.log(error);
    showMessageFail('Lỗi lấy dữ liệu phòng trọ của bạn');
  }
}

export function* createInnWatcher() {
  yield takeLatest(CREATE_INN, createInnTask);
}

function* createInnTask({payload}) {
  const {inns, myInns} = yield select(state => state.innReducer);
  if (payload.uid) {
    try {
      yield call(updateInnInFirebase, payload);
      yield call(updateInnInAlgolia, payload);

      if (inns && inns.length) {
        const index = inns.findIndex(item => item.uid === payload.uid);
        if (index !== -1) {
          yield put(
            updateInns(
              produce(inns, draft => {
                draft[index] = {...payload};
              }),
            ),
          );
        }
      }
      if (myInns && myInns.length) {
        const indexInn = myInns.findIndex(item => item.uid === payload.uid);
        if (indexInn !== -1) {
          yield put(
            updateMyInns(
              produce(myInns, draft => {
                draft[indexInn] = {...payload};
              }),
            ),
          );
        }
      }
      showMessageSuccess('Cập nhật thông tin phòng thành công');
    } catch (error) {
      put(createInnFail('Lỗi cập nhật thông tin phòng.'));
      showMessageFail('Lỗi cập nhật được thông tin phòng.');
    }
  } else {
    try {
      const result = yield call(createInnInFirebase, payload);
      yield call(createInnInAlgolia, {objectID: result.id, ...payload});
      yield put(createInnSuccess({...payload, uid: result.id}));
      showMessageSuccess('Tạo thông tin phòng thành công');
    } catch (error) {
      yield put(createInnFail('Lỗi tạo thông tin phòng.'));
      showMessageFail('Lỗi tạo thông tin phòng.');
    }
  }
}

export function* deleteInn() {
  yield takeLatest(DELETE_INN, deleteInnTask);
}

function* deleteInnTask({payload}) {
  try {
    if (!payload) {
      throw new Error('ERR_ID_NOT_NULL');
    }
    yield call(deleteInnInFirebase, payload);
    yield call(deleteInnInAlgolia, payload);
    yield put(deleteInnSuccess(payload));
    showMessageSuccess('Đã xóa trọ');
  } catch (error) {
    console.log(error);
    yield put(deleteInnFail(error));
    showMessageFail('Xóa không thành công, vui lòng thử lại sau!');
  }
}
