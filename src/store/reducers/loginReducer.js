import {SET_CONFIRM_CODE} from '../actions/types';

const loginReducer = (state = {confirm: null}, action) => {
  switch (action.type) {
    case SET_CONFIRM_CODE:
      return {
        ...state,
        confirm: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
