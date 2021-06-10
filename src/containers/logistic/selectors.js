import {createSelector} from 'reselect';
import get from 'lodash/fp/get';

const selectLogisticState = state => state.logisticReducer;

export const selectLogistics = createSelector(selectLogisticState, state =>
  get('logistics', state),
);

export const selectMyLogistics = createSelector(selectLogisticState, state =>
  get('myLogistics', state),
);

export const selectCount = createSelector(selectLogisticState, state =>
  get('count', state),
);

export const selectFetchLogisticsStatus = createSelector(
  selectLogisticState,
  state => get('fetchLogistics', state),
);

export const selectFetchMyLogisticsStatus = createSelector(
  selectLogisticState,
  state => get('fetchMyLogistics', state),
);

export const selectCreateLogisticStatus = createSelector(
  selectLogisticState,
  state => get('createLogistic', state),
);

export const selectUpdateLogisticStatus = createSelector(
  selectLogisticState,
  state => get('updateLogistic', state),
);

export const selectDeleteLogisticStatus = createSelector(
  selectLogisticState,
  state => get('deleteLogistic', state),
);
