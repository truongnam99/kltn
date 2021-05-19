import {createSelector} from 'reselect';
import get from 'lodash/fp/get';

const selectUserState = state => state.userReducer;

export const selectUserInfo = createSelector(selectUserState, state =>
  get('userInfo', selectUserState),
);
