import {
  CREATE_LOGISTIC,
  FETCH_LOGISTIC,
  LOGISTIC_IS_LOADING,
} from '../actions/types';

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

export const setLoading = payload => {
  return {type: LOGISTIC_IS_LOADING, payload};
};
