import {FETCH_INN} from '../actions/types';

export const fetchInn = offset => {
  return {
    type: FETCH_INN,
    payload: offset,
  };
};
