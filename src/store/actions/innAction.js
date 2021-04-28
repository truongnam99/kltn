import {FETCH_INN} from '../actions/types';

export const fetchInn = payload => {
  return {
    type: FETCH_INN,
    payload: payload,
  };
};
