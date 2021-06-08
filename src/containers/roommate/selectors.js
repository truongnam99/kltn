import {createSelector} from 'reselect';
import get from 'lodash/fp/get';

const selectRoommateState = state => state.roommateReducer;

export const selectMyPosts = createSelector(selectRoommateState, state =>
  get('myPost', state),
);

export const selectIsLoading = createSelector(selectRoommateState, state =>
  get('isLoading', state),
);

export const selectRoommates = createSelector(selectRoommateState, state =>
  get('roommates', state),
);
