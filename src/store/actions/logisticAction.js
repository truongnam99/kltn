import {CREATE_LOGISTIC, FETCH_LOGISTIC} from '../actions/types';

export const fetchLogistic = payload => {
  return {
    type: FETCH_LOGISTIC,
    payload: payload,
  };
};

export const createLogistic = payload => {
  return {
    type: CREATE_LOGISTIC,
    payload,
  };
};
