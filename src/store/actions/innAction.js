import {CREATE_INN, FETCH_INN, FETCH_MY_INN} from '../actions/types';

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
