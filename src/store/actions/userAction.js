import {
  SET_USER,
  CREATE_USER,
  SET_USER_CREDENTIAL,
  LOGOUT,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  RESET_UPDATE_USER_STATUS,
} from './types';

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

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const updateUser = payload => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const updateUserSuccess = payload => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload,
  };
};

export const updateUserFail = payload => {
  return {
    type: UPDATE_USER_FAIL,
    payload,
  };
};

export const resetUpdateUserStatus = payload => {
  return {
    type: RESET_UPDATE_USER_STATUS,
  };
};
