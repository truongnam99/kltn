import {SET_CHANGE_MESSAGES} from '../actions/types';

const messageReducer = (
  state = {
    message: {},
    isLoading: false,
    isEnd: false,
    last: null,
  },
  action,
) => {
  switch (action.type) {
    case SET_CHANGE_MESSAGES:
      return {
        ...state,
        message: {
          ...state.message,
          ...action.payload.reduce((result, item) => {
            return {
              ...result,
              ...item,
            };
          }, {}),
        },
      };
    default:
      return state;
  }
};

export default messageReducer;
