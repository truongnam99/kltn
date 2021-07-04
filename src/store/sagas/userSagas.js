import {put, takeLatest} from 'redux-saga/effects';
import {UPDATE_USER} from '../actions/types';
import {updateUserFail, updateUserSuccess} from '../actions/userAction';
import {updateUser} from '../../service/userService';
import {showMessageFail, showMessageSuccess} from '../../utils/utils';
import {uploadImagesToFirebase} from '../../service/firebaseService';

export function* updateUserWatcher() {
  yield takeLatest(UPDATE_USER, updateUserTask);
}

function* updateUserTask({payload}) {
  try {
    let data = {...payload};
    if (payload.photoURL) {
      payload.photoURL.startsWith('file:');
      const [photoURL] = yield uploadImagesToFirebase([payload.photoURL]);
      data.photoURL = photoURL;
    }
    yield updateUser(data);
    yield put(updateUserSuccess(data));
    showMessageSuccess('Cập nhật thông tin thành công');
  } catch (error) {
    console.log(error);
    put(updateUserFail('Cập nhật thông tin thất bại. Vui lòng thử lại'));
    showMessageFail('Cập nhật thông tin thất bại. Vui lòng thử lại');
  }
}
