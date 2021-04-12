import {SET_USER} from '../../store/actions/types';

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}
