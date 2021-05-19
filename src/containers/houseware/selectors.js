import {createSelector} from 'reselect';
import get from 'lodash/fp/get';

const selectHousewareState = state => state.housewareReducer;

export const selectHousewares = createSelector(selectHousewareState, state =>
  get('housewares', state),
);

export const selectFetchHousewares = createSelector(
  selectHousewareState,
  state => get('fetchHousewares', state),
);

export const selectCreateHouseware = createSelector(
  selectHousewareState,
  state => get('createHouseware', state),
);
