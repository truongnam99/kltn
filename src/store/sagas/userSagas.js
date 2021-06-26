import {put, takeLatest} from 'redux-saga/effects';
import {UPDATE_USER} from '../actions/types';
import {updateUserFail, updateUserSuccess} from '../actions/userAction';
import {updateUser} from '../../service/userService';
import {showMessageFail, showMessageSuccess} from '../../utils/utils';

export function* updateUserWatcher() {
  yield takeLatest(UPDATE_USER, updateUserTask);
}

function* updateUserTask({payload}) {
  try {
    yield updateUser(payload);
    yield put(updateUserSuccess(payload));
    showMessageSuccess('Cập nhật thông tin thành công');
  } catch (error) {
    console.log(error);
    put(updateUserFail('Cập nhật thông tin thất bại. Vui lòng thử lại'));
    showMessageFail('Cập nhật thông tin thất bại. Vui lòng thử lại');
  }
}
