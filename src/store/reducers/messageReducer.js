import {
  FETCH_LAST_MESSAGES,
  FETCH_DETAIL_MESSAGES,
  SEND_MESSAGE,
  MESSAGE_SET_LAST,
  MESSAGE_SET_END,
  MESSAGE_DETAIL_SET_END,
  DETAIL_MESSAGE_SET_LAST,
  SET_CHANGE_MESSAGES,
} from '../actions/types';

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
    case FETCH_LAST_MESSAGES:
      console.log('TODO: IMPLEMENT ACTION FOR FETCH_LAST_MESSAGES');
      return state;
    case FETCH_DETAIL_MESSAGES:
      console.log('TODO: IMPLEMENT ACTION FOR FETCH_DETAIL_MESSAGES');
      return state;
    case SEND_MESSAGE:
      console.log('TODO: IMPLEMENT ACTION FOR SEND_MESSAGE');
      return state;
    case MESSAGE_SET_LAST:
      console.log('TODO: IMPLEMENT ACTION FOR MESSAGE_SET_LAST');
      return state;
    case DETAIL_MESSAGE_SET_LAST:
      console.log('TODO: IMPLEMENT ACTION FOR DETAIL_MESSAGE_SET_LAST');
      return state;
    case MESSAGE_SET_END:
      console.log('TODO: IMPLEMENT ACTION FOR MESSAGE_SET_END');
      return state;
    case MESSAGE_DETAIL_SET_END:
      console.log('TODO: IMPLEMENT ACTION FOR MESSAGE_DETAIL_SET_END');
      return state;
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
