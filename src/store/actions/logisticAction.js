import {FETCH_LOGISTIC} from '../actions/types';

export const fetchLogistic = payload => {
  return {
    type: FETCH_LOGISTIC,
    payload: payload,
  };
};
