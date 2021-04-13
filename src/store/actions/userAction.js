import {SET_USER, CREATE_USER, SET_USER_CREDENTIAL} from './types';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setUserCredential = userCredential => {
  return {
    type: SET_USER_CREDENTIAL,
    payload: userCredential,
  };
};

export const createUser = user => {
  return {
    type: CREATE_USER,
    payload: user,
  };
};
