import {SET_USER, CREATE_USER} from './types';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const createUser = user => {
  return {
    type: CREATE_USER,
    payload: user,
  };
};
