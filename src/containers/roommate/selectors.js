import {createSelector} from 'reselect';
import get from 'lodash/fp/get';

const selectRoommateState = state => state.roommateReducer;

export const selectRoommates = createSelector(selectRoommateState, state =>
  get('roommates', state),
);

export const selectMyRoommates = createSelector(selectRoommateState, state =>
  get('myRoommates', state),
);

export const selectFetchRoommateStatus = createSelector(
  selectRoommateState,
  state => get('fetchRoommate', state),
);

export const selectFetchMyRoommateStatus = createSelector(
  selectRoommateState,
  state => get('fetchMyRoommate', state),
);

export const selectCreateRoommateStatus = createSelector(
  selectRoommateState,
  state => get('createRoommate', state),
);

export const selectUpdateRoommateStatus = createSelector(
  selectRoommateState,
  state => get('updateRoommate', state),
);

export const selectDeleteRoommateStatus = createSelector(
  selectRoommateState,
  state => get('deleteRoommate', state),
);

export const selectChangeRoommateActiveStatus = createSelector(
  selectRoommateState,
  state => get('changeRoommateActive', state),
);
