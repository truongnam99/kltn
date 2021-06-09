import {createSelector} from 'reselect';
import get from 'lodash/fp/get';

const selectUserState = state => state.userReducer;
const selectLoginState = state => state.loginReducer;

export const selectUserInfo = createSelector(selectUserState, state =>
  get('userInfo', state),
);

export const selectUserCredetial = createSelector(selectUserState, state =>
  get('userCredential', state),
);

export const selectUid = createSelector(selectUserState, state =>
  get('userCredential.uid', state),
);

export const selectConfirm = createSelector(selectLoginState, state =>
  get('confirm', state),
);

export const selectRole = createSelector(selectUserState, state =>
  get('userInfo.role', state),
);
