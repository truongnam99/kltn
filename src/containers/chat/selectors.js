import get from 'lodash/fp/get';
import {createSelector} from 'reselect';

const selectMessageState = state => state.messageReducer;

export const selectMessage = createSelector(selectMessageState, state =>
  get('message', state),
);
