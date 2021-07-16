import {GET_SETTING, SAVE_SETTING, SET_SETTING} from './types';

export const saveSetting = payload => {
  return {
    type: SAVE_SETTING,
    payload,
  };
};

export const getSetting = payload => {
  return {
    type: GET_SETTING,
    payload,
  };
};

export const setSetting = payload => {
  return {
    type: SET_SETTING,
    payload,
  };
};
