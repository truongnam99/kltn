import {
  CHANGE_ROOMMATE_ACTIVE,
  CHANGE_ROOMMATE_ACTIVE_FAIL,
  CHANGE_ROOMMATE_ACTIVE_SUCCESS,
  CREATE_ROOMMATE,
  CREATE_ROOMMATE_FAIL,
  CREATE_ROOMMATE_SUCCESS,
  DELETE_ROOMMATE,
  DELETE_ROOMMATE_FAIL,
  DELETE_ROOMMATE_SUCCESS,
  FETCH_MY_ROOMMATE,
  FETCH_MY_ROOMMATE_FAIL,
  FETCH_MY_ROOMMATE_SUCCESS,
  FETCH_ROOMMATE,
  FETCH_ROOMMATE_FAIL,
  FETCH_ROOMMATE_SUCCESS,
  RESET_CREATE_ROOMMATE_STATUS,
  RESET_DELETE_ROOMMATE_STATUS,
  RESET_FETCH_ROOMMATE_STATUS,
  RESET_UPDATE_ROOMMATE_STATUS,
  ROOMMATE_RELOAD_LIST,
  ROOMMATE_SET_END,
  ROOMMATE_SET_LAST,
  UPDATE_ROOMMATE,
  UPDATE_ROOMMATE_FAIL,
  UPDATE_ROOMMATE_SUCCESS,
} from '../actions/types';

export const fetchRoommate = payload => {
  return {
    type: FETCH_ROOMMATE,
    payload,
  };
};

export const fetchRoommateSuccess = payload => {
  return {
    type: FETCH_ROOMMATE_SUCCESS,
    payload,
  };
};

export const fetchRoommateFail = payload => {
  return {
    type: FETCH_ROOMMATE_FAIL,
    payload,
  };
};

export const fetchMyRoommate = payload => {
  return {
    type: FETCH_MY_ROOMMATE,
    payload,
  };
};

export const fetchMyRoommateSuccess = payload => {
  return {
    type: FETCH_MY_ROOMMATE_SUCCESS,
    payload,
  };
};

export const fetchMyRoommateFail = payload => {
  return {
    type: FETCH_MY_ROOMMATE_FAIL,
    payload,
  };
};

export const createRoommate = payload => {
  return {
    type: CREATE_ROOMMATE,
    payload,
  };
};

export const createRoommateSuccess = payload => {
  return {
    type: CREATE_ROOMMATE_SUCCESS,
    payload,
  };
};

export const createRoommateFail = payload => {
  return {
    type: CREATE_ROOMMATE_FAIL,
    payload,
  };
};

export const updateRoommate = payload => {
  return {
    type: UPDATE_ROOMMATE,
    payload,
  };
};

export const updateRoommateSuccess = payload => {
  return {
    type: UPDATE_ROOMMATE_SUCCESS,
    payload,
  };
};

export const updateRoommateFail = payload => {
  return {
    type: UPDATE_ROOMMATE_FAIL,
    payload,
  };
};

export const deleteRoommate = payload => {
  return {
    type: DELETE_ROOMMATE,
    payload,
  };
};

export const deleteRoommateSuccess = payload => {
  return {
    type: DELETE_ROOMMATE_SUCCESS,
    payload,
  };
};

export const deleteRoommateFail = payload => {
  return {
    type: DELETE_ROOMMATE_FAIL,
    payload,
  };
};

export const changeRoommateActive = payload => {
  return {
    type: CHANGE_ROOMMATE_ACTIVE,
    payload,
  };
};

export const changeRoommateActiveSuccess = payload => {
  return {
    type: CHANGE_ROOMMATE_ACTIVE_SUCCESS,
    payload,
  };
};

export const changeRoommateActiveFail = payload => {
  return {
    type: CHANGE_ROOMMATE_ACTIVE_FAIL,
    payload,
  };
};

export const resetFetchRoommateStatus = payload => {
  return {
    type: RESET_FETCH_ROOMMATE_STATUS,
    payload,
  };
};

export const resetCreateRoommateStatus = payload => {
  return {
    type: RESET_CREATE_ROOMMATE_STATUS,
    payload,
  };
};

export const resetUpdateRoommateStatus = payload => {
  return {
    type: RESET_UPDATE_ROOMMATE_STATUS,
    payload,
  };
};

export const resetDeleteRoommateStatus = payload => {
  return {
    type: RESET_DELETE_ROOMMATE_STATUS,
    payload,
  };
};

export const reloadRoommate = payload => {
  return {
    type: ROOMMATE_RELOAD_LIST,
    payload,
  };
};

export const setLast = payload => {
  return {
    type: ROOMMATE_SET_LAST,
    payload,
  };
};

export const setEnd = payload => {
  return {
    type: ROOMMATE_SET_END,
    payload,
  };
};
