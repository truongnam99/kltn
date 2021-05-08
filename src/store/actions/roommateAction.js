import {FETCH_ROOMMATE} from '../actions/types';

export const fetchRoommate = payload => {
  return {
    type: FETCH_ROOMMATE,
    payload: payload,
  };
};
