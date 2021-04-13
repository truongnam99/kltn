import {SET_CONFIRM_CODE, SET_PHONE_NUMBER} from './types';

export const setConfirm = confirm => {
  return {
    type: SET_CONFIRM_CODE,
    payload: confirm,
  };
};

export const setPhoneNumber = phoneNumber => {
  return {
    type: SET_PHONE_NUMBER,
    payload: phoneNumber,
  };
};
