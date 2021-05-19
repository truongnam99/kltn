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
