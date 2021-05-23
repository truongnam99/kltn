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

export const selectUpdateHouseware = createSelector(
  selectHousewareState,
  state => get('updateHouseware', state),
);

export const selectMyHousewares = createSelector(selectHousewareState, state =>
  get('myHousewares', state),
);

export const selectFetchMyHousewaresStatus = createSelector(
  selectHousewareState,
  state => get('fetchMyHousewares', state),
);
