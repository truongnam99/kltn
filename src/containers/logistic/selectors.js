import {createSelector} from 'reselect';
import get from 'lodash/fp/get';

const selectLogisticState = state => state.logisticReducer;

export const selectIsLoading = createSelector(selectLogisticState, state =>
  get('isLoading', state),
);

export const selectLogistics = createSelector(selectLogisticState, state =>
  get('logistics', state),
);

export const selectMyLogistics = createSelector(selectLogisticState, state =>
  get('myLogistics', state),
);

export const selectCount = createSelector(selectLogisticState, state =>
  get('count', state),
);
