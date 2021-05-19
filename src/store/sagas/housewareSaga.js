import {call, put, select, takeLatest} from 'redux-saga/effects';
import {createHouseware, fetchHousewares} from '../../service/housewareService';
import {uploadImagesToFirebase} from '../../service/firebaseService';
import {FETCH_HOUSEWARES, HOUSEWARE_CREATE_POST} from '../actions/types';
import {
  createHousewareFail,
  createHousewareSuccess,
  fetchHousewaresFail,
  fetchHousewaresSuccess,
  resetListHouseware,
  setEndOfHousewares,
  setFetchHousewareStatus,
  setLastHouseware,
} from '../actions/housewareAction';
import {status} from '../../constants/constants';

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
    const {endOfHousewares, last} = yield select(
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
    options.last = last;
    const results = yield call(fetchHousewares, options);
    console.log('results: ', results);

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
  } catch (error) {
    yield put(fetchHousewaresFail(error.message));
  }
}
