import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  CREATE_ROOMMATE,
  DELETE_ROOMMATE,
  FETCH_MY_ROOMMATE,
  FETCH_ROOMMATE,
  UPDATE_ROOMMATE,
  CHANGE_ROOMMATE_ACTIVE,
} from '../actions/types';
import {showMessageFail, showMessageSuccess} from '../../utils/utils';
import {
  changeRoommateActiveFail,
  changeRoommateActiveSuccess,
  createRoommateFail,
  createRoommateSuccess,
  deleteRoommateSuccess,
  fetchMyRoommateFail,
  fetchMyRoommateSuccess,
  fetchRoommateFail,
  fetchRoommateSuccess,
  reloadRoommate,
  resetFetchRoommateStatus,
  setEnd,
  setLast,
  updateRoommateFail,
  updateRoommateSuccess,
} from '../actions/roommateAction';
import {
  changeRoommateActive,
  createRoommate,
  deleteRoommate,
  fetchMyRoommate,
  fetchRoommate,
  updateRoommate,
} from '../../service/roommateService';

export function* fetchRoommateWatcher() {
  yield takeLatest(FETCH_ROOMMATE, fetchRoommateTask);
}

function* fetchRoommateTask({payload}) {
  try {
    if (payload.reload) {
      yield put(reloadRoommate());
    }
    const {isEnd, last} = yield select(state => state.roommateReducer);
    if (isEnd && !payload.reload) {
      put(resetFetchRoommateStatus());
      return;
    }
    const result = yield call(fetchRoommate, {...payload, last});
    if (result.docs.length) {
      yield put(setLast(result.docs[result.docs.length - 1]));
    }
    if (result.docs.length < payload.limit) {
      yield put(setEnd(true));
    }
    yield put(
      fetchRoommateSuccess(
        result.docs.map(item => ({
          ...item.data(),
          id: item.id,
        })),
      ),
    );
  } catch (error) {
    console.log(error);
    yield put(fetchRoommateFail('ERR_FETCH_ROOMMATE'));
    showMessageFail('Không thể lấy dữ liệu bài đăng');
  }
}

export function* fetchMyRoommateWatcher() {
  yield takeLatest(FETCH_MY_ROOMMATE, fetchMyRoommateTask);
}

function* fetchMyRoommateTask() {
  try {
    const {uid} = yield select(state => state.userReducer.userInfo);
    const result = yield call(fetchMyRoommate, uid);
    yield put(
      fetchMyRoommateSuccess(
        result.docs.map(item => ({
          ...item.data(),
          id: item.id,
        })),
      ),
    );
  } catch (error) {
    console.log('error: ', error);
    yield put(fetchMyRoommateFail('ERR_FETCH_MY_ROOMMATE'));
    showMessageFail('Không thể lấy dữ liệu bài đăng tìm người ở ghép của bạn.');
  }
}

export function* changeRoommateActiveWatcher() {
  yield takeLatest(CHANGE_ROOMMATE_ACTIVE, changeRoommateActiveTask);
}

function* changeRoommateActiveTask({payload}) {
  try {
    yield call(changeRoommateActive, payload);
    yield put(changeRoommateActiveSuccess(payload));
    showMessageSuccess('Đã cập nhật trạng thái bài đăng.');
  } catch (error) {
    console.log('error: ', error);
    yield put(changeRoommateActiveFail('ERR_CHANGE_ROOMMATE_ACTIVE'));
    showMessageFail('Lỗi cập nhật trạng thái bài đăng.');
  }
}

export function* createRoommateWatcher() {
  yield takeLatest(CREATE_ROOMMATE, createRoommateTask);
}

function* createRoommateTask({payload}) {
  try {
    const result = yield call(createRoommate, payload);
    yield put(
      createRoommateSuccess({
        id: result.id,
        ...payload,
      }),
    );
    showMessageSuccess('Tạo thành công');
  } catch (error) {
    console.log('error: ', error);
    yield put(createRoommateFail('ERR_CREATE_ROOMMATE'));
    showMessageFail('Lỗi tạo bài đăng');
  }
}

export function* updateRoommateWatcher() {
  yield takeLatest(UPDATE_ROOMMATE, updateRoommateTask);
}

function* updateRoommateTask({payload}) {
  try {
    yield call(updateRoommate, payload);
    yield put(updateRoommateSuccess(payload));
    showMessageSuccess('Đã cập nhật thông tin');
  } catch (error) {
    console.log('error: ', error);
    yield put(updateRoommateFail('ERR_UPDATE_ROOMMATE'));
    showMessageFail('Lỗi cập nhật');
  }
}

export function* deleteRoommateWatcher() {
  yield takeLatest(DELETE_ROOMMATE, deleteRoommateTask);
}

function* deleteRoommateTask({payload}) {
  try {
    yield call(deleteRoommate, payload);
    yield put(deleteRoommateSuccess(payload));
  } catch (error) {
    console.log('error: ', error);
    yield put(updateRoommateFail('ERR_UPDATE_ROOMMATE'));
    showMessageFail('Lỗi xóa');
  }
}
