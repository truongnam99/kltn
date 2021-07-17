import {call, put, takeLatest} from 'redux-saga/effects';

import {GET_SETTING, SAVE_SETTING} from '../actions/types';
import {setSetting} from '../actions/globalAction';
import {getObject, saveObject, showMessageFail} from '../../utils/utils';

export function* getSettingWatcher() {
  yield takeLatest(GET_SETTING, getSettingTask);
}

function* getSettingTask({payload}) {
  try {
    const result = yield call(getObject, payload);
    if (result?.setting) {
      yield put(setSetting(result.setting));
    }
  } catch (error) {
    showMessageFail('Không lấy được setting');
  }
}

export function* saveSettingWatcher() {
  yield takeLatest(SAVE_SETTING, saveSettingTask);
}

function* saveSettingTask({payload}) {
  try {
    yield call(saveObject, payload.uid, payload.value);
    yield put(setSetting(payload));
  } catch (error) {
    showMessageFail('Không lấy được setting');
  }
}
