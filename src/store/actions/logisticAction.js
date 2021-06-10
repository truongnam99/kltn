import {
  CREATE_LOGISTIC,
  CREATE_LOGISTIC_FAIL,
  CREATE_LOGISTIC_SUCCESS,
  DELETE_LOGISTIC,
  DELETE_LOGISTIC_FAIL,
  DELETE_LOGISTIC_SUCCESS,
  FETCH_LOGISTIC,
  FETCH_LOGISTIC_FAIL,
  FETCH_LOGISTIC_SUCCESS,
  FETCH_MY_LOGISTIC,
  FETCH_MY_LOGISTIC_FAIL,
  FETCH_MY_LOGISTIC_SUCCESS,
  LOGISTIC_RELOAD_LIST,
  LOGISTIC_RESET_CREATE_LOGISTIC_STATUS,
  LOGISTIC_RESET_DELETE_LOGISTIC_STATUS,
  LOGISTIC_RESET_UPDATE_LOGISTIC_STATUS,
  LOGISTIC_SET_END,
  LOGISTIC_SET_LAST,
  UPDATE_LOGISTIC,
  UPDATE_LOGISTIC_FAIL,
  UPDATE_LOGISTIC_SUCCESS,
} from '../actions/types';

export const fetchLogistic = payload => {
  return {
    type: FETCH_LOGISTIC,
    payload,
  };
};
export const fetchLogisticSuccess = payload => {
  return {
    type: FETCH_LOGISTIC_SUCCESS,
    payload,
  };
};
export const fetchLogisticFail = payload => {
  return {
    type: FETCH_LOGISTIC_FAIL,
    payload,
  };
};

export const fetchMyLogistic = payload => {
  return {
    type: FETCH_MY_LOGISTIC,
    payload,
  };
};
export const fetchMyLogisticSuccess = payload => {
  return {
    type: FETCH_MY_LOGISTIC_SUCCESS,
    payload,
  };
};
export const fetchMyLogisticFail = payload => {
  return {
    type: FETCH_MY_LOGISTIC_FAIL,
    payload,
  };
};

export const createLogistic = payload => {
  return {
    type: CREATE_LOGISTIC,
    payload,
  };
};

export const createLogisticSuccess = payload => {
  return {
    type: CREATE_LOGISTIC_SUCCESS,
    payload,
  };
};

export const createLogisticFail = payload => {
  return {
    type: CREATE_LOGISTIC_FAIL,
    payload,
  };
};

export const updateLogistic = payload => {
  return {
    type: UPDATE_LOGISTIC,
    payload,
  };
};

export const updateLogisticSuccess = payload => {
  return {
    type: UPDATE_LOGISTIC_SUCCESS,
    payload,
  };
};

export const updateLogisticFail = payload => {
  return {
    type: UPDATE_LOGISTIC_FAIL,
    payload,
  };
};

export const deleteLogistic = payload => {
  return {
    type: DELETE_LOGISTIC,
    payload,
  };
};

export const deleteLogisticSuccess = payload => {
  return {
    type: DELETE_LOGISTIC_SUCCESS,
    payload,
  };
};

export const deleteLogisticFail = payload => {
  return {
    type: DELETE_LOGISTIC_FAIL,
    payload,
  };
};

export const setLast = payload => {
  return {
    type: LOGISTIC_SET_LAST,
    payload,
  };
};

export const setEnd = payload => {
  return {
    type: LOGISTIC_SET_END,
    payload,
  };
};

export const reloadLogistics = payload => {
  return {
    type: LOGISTIC_RELOAD_LIST,
  };
};

export const resetCreateLogisticStatus = payload => {
  return {
    type: LOGISTIC_RESET_CREATE_LOGISTIC_STATUS,
  };
};

export const resetUpdateLogisticStatus = payload => {
  return {
    type: LOGISTIC_RESET_UPDATE_LOGISTIC_STATUS,
  };
};

export const resetDeleteLogisticStatus = payload => {
  return {
    type: LOGISTIC_RESET_DELETE_LOGISTIC_STATUS,
  };
};
