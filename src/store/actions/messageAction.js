import {CHANGE_MESSAGE} from './types';

export const changeMessage = payload => {
  return {type: CHANGE_MESSAGE, payload: payload};
};
