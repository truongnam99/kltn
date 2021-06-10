import {call, put, select, takeLatest} from 'redux-saga/effects';
import {showMessageFail, showMessageSuccess} from '../../utils/utils';
import {
  createLogisticInFirestore,
  fetchDataFromFirebase,
  updateLogisticInFirestore,
  fetchMyLogistic,
  deleteLogistic,
} from '../../service/logisticService';
import {
  createLogisticFail,
  createLogisticSuccess,
  deleteLogisticFail,
  deleteLogisticSuccess,
  fetchLogisticFail,
  fetchLogisticSuccess,
  fetchMyLogisticFail,
  fetchMyLogisticSuccess,
  reloadLogistics,
  setEnd,
  setLast,
  updateLogisticFail,
  updateLogisticSuccess,
} from '../actions/logisticAction';
import {
  CREATE_LOGISTIC,
  DELETE_LOGISTIC,
  FETCH_LOGISTIC,
  FETCH_MY_LOGISTIC,
  UPDATE_LOGISTIC,
} from '../actions/types';
import {uploadImagesToFirebase} from '../../service/firebaseService';

export function* fetchLogisticWatcher() {
  yield takeLatest(FETCH_LOGISTIC, fetchLogisticTask);
}

function* fetchLogisticTask({payload}) {
  try {
    const {isEnd, last} = yield select(state => state.logisticReducer);

    if (isEnd && !payload.reload) {
      yield put(setEnd(true));
      return;
    }
    if (payload.reload) {
      yield put(reloadLogistics());
    }
    const results = yield call(fetchDataFromFirebase, {
      ...payload,
      last: payload.reload ? null : last,
    });
    if (results.docs.length) {
      yield put(setLast(results.docs[results.docs.length - 1]));
    }
    const data = results.docs.map(item => ({id: item.id, ...item.data()}));
    if (data.length === 0) {
      yield put(setEnd(true));
    } else {
      yield put(fetchLogisticSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchLogisticFail('ERR_FETCH_LOGISTIC: at saga'));
    showMessageFail('Lỗi lấy dữ liệu');
  }
}

export function* createLogisticWatcher() {
  yield takeLatest(CREATE_LOGISTIC, createLogisticTask);
}

function* uploadImage(image) {
  try {
    if (!image) {
      return null;
    }
    return (yield uploadImagesToFirebase([image]))[0];
  } catch (error) {
    throw new Error('ERR_UPLOAD_IMAGE');
  }
}

function* createLogisticTask({type, payload}) {
  try {
    const image = yield uploadImage(payload.image);
    const result = yield createLogisticInFirestore({...payload, image});
    yield put(createLogisticSuccess({id: result.id, ...payload, image}));
    showMessageSuccess('Đã tạo dịch vụ vận chuyển');
  } catch (error) {
    console.log('error: ', error);
    yield put(createLogisticFail('ERR_CREATE_LOGISTIC: at saga'));
    showMessageFail('Lỗi tạo được dịch vụ vận chuyển.');
  }
}

export function* updateLogisticWatcher() {
  yield takeLatest(UPDATE_LOGISTIC, updateLogisticTask);
}

function* updateLogisticTask({type, payload}) {
  try {
    const image = yield uploadImage(payload.image);
    yield call(updateLogisticInFirestore, {...payload, image});
    yield put(updateLogisticSuccess({...payload, image}));
    showMessageSuccess('Cập nhật thành công');
  } catch (error) {
    console.log('error: ', error);
    yield put(updateLogisticFail('ERR_UPDATE_LOGISTIC: at saga'));
    showMessageFail('Lỗi cập nhật được thông tin dịch vụ vận chuyển.');
  }
}

export function* fetchMyLogisticWatcher() {
  yield takeLatest(FETCH_MY_LOGISTIC, fetchMyLogisticTask);
}

function* fetchMyLogisticTask() {
  try {
    const {uid} = yield select(state => state.userReducer.userCredential) || {};
    if (uid) {
      const result = yield call(fetchMyLogistic, uid);
      yield put(
        fetchMyLogisticSuccess(
          result.docs.map(item => {
            return {id: item.id, ...item.data()};
          }),
        ),
      );
    }
  } catch (error) {
    console.log('error: ', error);
    fetchMyLogisticFail('ERR_FETCH_MY_LOGISTIC: at saga');
    showMessageFail('Lỗi lấy được thông tin dịch vụ vận chuyển');
  }
}

export function* deleteLogisticWatcher() {
  yield takeLatest(DELETE_LOGISTIC, deleteLogisticTask);
}

function* deleteLogisticTask({payload}) {
  try {
    yield call(deleteLogistic, payload);
    yield put(deleteLogisticSuccess(payload));
    showMessageSuccess('Xóa thành công');
  } catch (error) {
    yield put(deleteLogisticFail('ERR_DELETE_LOGISTIC'));
    console.log(error);
    showMessageFail('Lỗi xóa dịch vụ vận chuyển');
  }
}
