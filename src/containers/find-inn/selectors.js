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

export const selectFetchInnStatus = createSelector(selectInnState, state =>
  get('fetchInns', state),
);

export const selectFetchMyInnStatus = createSelector(selectInnState, state =>
  get('fetchMyInns', state),
);

export const selectMyInns = createSelector(selectInnState, state =>
  get('myInns', state),
);

export const selectCreateInnStatus = createSelector(selectInnState, state =>
  get('createInn', state),
);

export const selectDeleteInnStatus = createSelector(selectInnState, state =>
  get('deleteInn', state),
);
