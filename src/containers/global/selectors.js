import get from 'lodash/fp/get';
import {createSelector} from 'reselect';

const selectInnState = state => state.globalReducer;

export const selectSetting = createSelector(selectInnState, state =>
  get('setting', state),
);
