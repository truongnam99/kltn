import {
  HOUSEWARE_CREATE_POST_SUCCESS,
  HOUSEWARE_CREATE_POST_FAIL,
  HOUSEWARE_CREATE_POST,
  FETCH_HOUSEWARES,
  FETCH_HOUSEWARES_SUCCESS,
  FETCH_HOUSEWARES_FAIL,
  SET_END_OF_HOUSEWARES,
  RESET_LIST_HOUSEWARES,
  SET_LAST_HOUSEWARE,
  SET_FETCH_HOUSEWARES,
  FETCH_MY_HOUSEWARES,
  FETCH_MY_HOUSEWARES_SUCCESS,
  FETCH_MY_HOUSEWARES_FAIL,
  UPDATE_HOUSEWARE_IS_ACTIVE,
  UPDATE_HOUSEWARE_IS_ACTIVE_SUCCESS,
  UPDATE_HOUSEWARE_IS_ACTIVE_FAIL,
  UPDATE_HOUSEWARE,
  UPDATE_HOUSEWARE_SUCCESS,
  UPDATE_HOUSEWARE_FAIL,
  RESET_CREATE_HOUSEWARE_STATUS,
  RESET_UPDATE_HOUSEWARE_STATUS,
} from './types';

export const createHouseware = payload => {
  return {
    type: HOUSEWARE_CREATE_POST,
    payload,
  };
};

export const createHousewareSuccess = payload => {
  return {
    type: HOUSEWARE_CREATE_POST_SUCCESS,
    payload,
  };
};

export const createHousewareFail = () => {
  return {
    type: HOUSEWARE_CREATE_POST_FAIL,
  };
};

export const fetchHousewares = payload => {
  return {
    type: FETCH_HOUSEWARES,
    payload,
  };
};

export const fetchHousewaresSuccess = payload => {
  return {
    type: FETCH_HOUSEWARES_SUCCESS,
    payload,
  };
};

export const fetchHousewaresFail = payload => {
  return {
    type: FETCH_HOUSEWARES_FAIL,
    payload,
  };
};

export const setEndOfHousewares = payload => {
  return {
    type: SET_END_OF_HOUSEWARES,
    payload,
  };
};

export const resetListHouseware = () => {
  return {
    type: RESET_LIST_HOUSEWARES,
  };
};

export const setLastHouseware = payload => {
  return {
    type: SET_LAST_HOUSEWARE,
    payload,
  };
};

export const setFetchHousewareStatus = payload => {
  return {
    type: SET_FETCH_HOUSEWARES,
    payload,
  };
};

export const fetchMyHousewares = payload => {
  return {
    type: FETCH_MY_HOUSEWARES,
    payload,
  };
};

export const fetchMyHousewareSuccess = payload => {
  return {
    type: FETCH_MY_HOUSEWARES_SUCCESS,
    payload,
  };
};

export const fetchMyHousewareFail = payload => {
  return {
    type: FETCH_MY_HOUSEWARES_FAIL,
    payload,
  };
};

export const updateHousewareIsActive = payload => {
  return {
    type: UPDATE_HOUSEWARE_IS_ACTIVE,
    payload,
  };
};

export const updateHousewareIsActiveSuccess = payload => {
  return {
    type: UPDATE_HOUSEWARE_IS_ACTIVE_SUCCESS,
    payload,
  };
};

export const updateHousewareIsActiveFail = payload => {
  return {
    type: UPDATE_HOUSEWARE_IS_ACTIVE_FAIL,
    payload,
  };
};

export const updateHouseware = payload => {
  return {
    type: UPDATE_HOUSEWARE,
    payload,
  };
};

export const updateHousewareSuccess = payload => {
  return {
    type: UPDATE_HOUSEWARE_SUCCESS,
    payload,
  };
};

export const updateHousewareFail = payload => {
  return {
    type: UPDATE_HOUSEWARE_FAIL,
    payload,
  };
};

export const resetCreateHousewareStatus = () => {
  return {
    type: RESET_CREATE_HOUSEWARE_STATUS,
  };
};

export const resetUpdateHousewareStatus = () => {
  return {
    type: RESET_UPDATE_HOUSEWARE_STATUS,
  };
};
