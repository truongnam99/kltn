import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  createHouseware,
  fetchHousewares,
  fetchHousewaresFromAlgolia,
  fetchMyHousewares,
  updateHouseware,
  updateHousewareIsActive,
} from '../../service/housewareService';
import {uploadImagesToFirebase} from '../../service/firebaseService';
import {
  FETCH_HOUSEWARES,
  FETCH_MY_HOUSEWARES,
  HOUSEWARE_CREATE_POST,
  UPDATE_HOUSEWARE,
  UPDATE_HOUSEWARE_IS_ACTIVE,
} from '../actions/types';
import {
  createHousewareFail,
  createHousewareSuccess,
  fetchHousewaresFail,
  fetchHousewaresSuccess,
  fetchMyHousewareFail,
  fetchMyHousewareSuccess,
  resetListHouseware,
  setEndOfHousewares,
  setFetchHousewareStatus,
  setLastHouseware,
  updateHousewareFail,
  updateHousewareIsActiveFail,
  updateHousewareIsActiveSuccess,
  updateHousewareSuccess,
} from '../actions/housewareAction';
import {status} from '../../constants/constants';
import {firebase} from '@react-native-firebase/firestore';

export function* createHousewareWatcher() {
  yield takeLatest(HOUSEWARE_CREATE_POST, createHousewareTask);
}

function* createHousewareTask({payload}) {
  try {
    const images = payload.items.map(item => item.image);
    const imageUrls = yield call(uploadImagesToFirebase, images);
    imageUrls.forEach((imageUrl, index) => {
      payload.items[index].image = imageUrl;
    });
    const docRef = yield call(createHouseware, payload);
    if (docRef) {
      const document = yield docRef.get();
      const data = {
        id: docRef.id,
        ...document.data(),
      };
      yield put(createHousewareSuccess(data));
    } else {
      yield put(createHousewareFail());
    }
  } catch (error) {
    console.error(error);
    yield put(createHousewareFail());
  }
}

export function* fetchHousewaresWatcher() {
  yield takeLatest(FETCH_HOUSEWARES, fetchHousewaresTask);
}

function* fetchHousewaresTask({payload}) {
  try {
    const {reload, ...options} = payload;
    if (reload) {
      yield put(resetListHouseware());
    }
    const {endOfHousewares, last, housewares} = yield select(
      state => state.housewareReducer,
    );
    if (endOfHousewares) {
      yield put(
        setFetchHousewareStatus({
          status: status.SUCCESS,
          message: 'Đã tới cuối danh sách',
        }),
      );
      return;
    }

    if (options.searchText) {
      options.page = Math.ceil(housewares.length / 10);
      const results = yield call(fetchHousewaresFromAlgolia, options);

      if (results.hits.length) {
        const data = results.hits.map(item => {
          const {objectID, createdAt, ...rest} = item;
          return {
            id: objectID,
            createdAt: createdAt
              ? new firebase.firestore.Timestamp(
                  createdAt.seconds,
                  createdAt.nanoseconds,
                )
              : null,
            ...rest,
          };
        });
        yield put(fetchHousewaresSuccess(data));
      } else {
        yield put(setEndOfHousewares(true));
      }
    } else {
      options.last = last;
      const results = yield call(fetchHousewares, options);

      if (results.docs.length) {
        const data = results.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        yield put(setLastHouseware(results.docs[results.docs.length - 1]));
        yield put(fetchHousewaresSuccess(data));
      } else {
        yield put(setEndOfHousewares(true));
      }
    }
  } catch (error) {
    console.error('error: ', error);

    yield put(fetchHousewaresFail(error.message));
  }
}

export function* fetchMyHousewaresWatcher() {
  yield takeLatest(FETCH_MY_HOUSEWARES, fetchMyHousewaresTask);
}

function* fetchMyHousewaresTask({payload}) {
  try {
    const userInfo = yield select(state => state.userReducer.userInfo);
    const result = yield call(fetchMyHousewares, {ownerId: userInfo.uid});
    yield put(
      fetchMyHousewareSuccess(
        result.docs.map(item => {
          return {
            id: item.id,
            ...item.data(),
          };
        }),
      ),
    );
  } catch (error) {
    yield put(fetchMyHousewareFail(error.message));
    console.error(error);
  }
}

export function* updateHousewareIsAtiveWatcher() {
  yield takeLatest(UPDATE_HOUSEWARE_IS_ACTIVE, updateHousewareIsActiveTask);
}

function* updateHousewareIsActiveTask({payload}) {
  try {
    yield call(updateHousewareIsActive, payload);
    yield put(updateHousewareIsActiveSuccess(payload));
  } catch (error) {
    console.error(error);
    yield put(updateHousewareIsActiveFail('Lỗi cập nhật trạng thái'));
  }
}

export function* updateHousewareWatcher() {
  yield takeLatest(UPDATE_HOUSEWARE, updateHousewareTask);
}

function* updateHousewareTask({payload}) {
  try {
    yield call(updateHouseware, payload);
    yield put(updateHousewareSuccess(payload));
  } catch (error) {
    console.error(error);
    yield put(updateHousewareFail('Lỗi cập nhật trạng thái'));
  }
}
