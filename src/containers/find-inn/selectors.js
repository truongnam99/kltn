import get from 'lodash/fp/get';
import {createSelector} from 'reselect';

const selectInnState = state => state.innReducer;

export const selectInns = createSelector(selectInnState, state =>
  get('inns', state),
);

export const selectCount = createSelector(selectInnState, state =>
  get('count', state),
);

export const selectIsLoading = createSelector(selectInnState, state =>
  get('isLoading', state),
);
