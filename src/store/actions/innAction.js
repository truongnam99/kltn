import {
  CREATE_INN,
  CREATE_INN_FAIL,
  CREATE_INN_SUCCESS,
  DELETE_INN,
  DELETE_INN_FAIL,
  DELETE_INN_SUCCESS,
  FETCH_INN,
  FETCH_INN_FAIL,
  FETCH_INN_SUCCESS,
  FETCH_MY_INN,
  FETCH_MY_INN_FAIL,
  FETCH_MY_INN_SUCCESS,
  INN_RELOAD_LIST,
  INN_SET_lAST,
  INN_SHOW_LOADING,
  RESET_CREATE_INN_STATUS,
  SET_IS_END,
  UPDATE_INNS,
  UPDATE_MY_INNS,
} from '../actions/types';

export const fetchInn = payload => {
  return {
    type: FETCH_INN,
    payload: payload,
  };
};

export const fetchInnSuccess = payload => {
  return {
    type: FETCH_INN_SUCCESS,
    payload: payload,
  };
};

export const fetchInnFail = payload => {
  return {
    type: FETCH_INN_FAIL,
    payload: payload,
  };
};

export const fecthMyInn = payload => {
  return {
    type: FETCH_MY_INN,
    payload,
  };
};

export const fecthMyInnSuccess = payload => {
  return {
    type: FETCH_MY_INN_SUCCESS,
    payload,
  };
};

export const fecthMyInnFail = payload => {
  return {
    type: FETCH_MY_INN_FAIL,
    payload,
  };
};

export const createInn = payload => {
  return {
    type: CREATE_INN,
    payload,
  };
};

export const createInnSuccess = payload => {
  return {
    type: CREATE_INN_SUCCESS,
    payload,
  };
};

export const createInnFail = payload => {
  return {
    type: CREATE_INN_FAIL,
    payload,
  };
};

export const setLoading = payload => {
  return {type: INN_SHOW_LOADING, payload};
};

export const reloadInn = () => {
  return {
    type: INN_RELOAD_LIST,
  };
};

export const setEnd = payload => {
  return {type: SET_IS_END, payload};
};

export const setLast = payload => {
  return {type: INN_SET_lAST, payload};
};

export const updateInns = payload => {
  return {type: UPDATE_INNS, payload};
};

export const updateMyInns = payload => {
  return {type: UPDATE_MY_INNS, payload};
};

export const deleteInn = payload => {
  return {
    type: DELETE_INN,
    payload,
  };
};

export const deleteInnSuccess = payload => {
  return {
    type: DELETE_INN_SUCCESS,
    payload,
  };
};

export const deleteInnFail = payload => {
  return {
    type: DELETE_INN_FAIL,
    payload,
  };
};

export const resetCreateInnStatus = () => {
  return {
    type: RESET_CREATE_INN_STATUS,
  };
};
