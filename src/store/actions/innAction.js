import {
  CREATE_INN,
  FETCH_INN,
  FETCH_MY_INN,
  INN_SHOW_LOADING,
} from '../actions/types';

export const fetchInn = payload => {
  return {
    type: FETCH_INN,
    payload: payload,
  };
};

export const fecthMyInn = payload => {
  return {
    type: FETCH_MY_INN,
    payload,
  };
};

export const createInn = payload => {
  return {
    type: CREATE_INN,
    payload,
  };
};

export const setLoading = payload => {
  return {type: INN_SHOW_LOADING, payload};
};
