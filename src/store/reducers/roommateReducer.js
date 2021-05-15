import {
  ADD_ROOMMATE,
  ROOMMATE_IS_LOADING,
  ROOMMATE_SET_END,
  ROOMMATE_SET_LAST,
  ROOMMATE_RELOAD_LIST,
  ADD_MY_POST,
  UPDATE_MY_POST,
  UPDATE_POST,
} from '../actions/types';

const roommateReducer = (
  state = {
    roommates: [],
    count: 0,
    isLoading: false,
    isEnd: false,
    last: null,
  },
  action,
) => {
  switch (action.type) {
    case ADD_ROOMMATE:
      return {
        ...state,
        count: state.count + action.payload?.length,
        roommates: [...state.roommates, ...action.payload],
        isLoading: false,
      };
    case ROOMMATE_SET_END:
      return {
        ...state,
        isLoading: false,
        isEnd: action.payload,
      };
    case ROOMMATE_SET_LAST:
      return {
        ...state,
        last: action.payload,
      };
    case ROOMMATE_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ROOMMATE_RELOAD_LIST:
      return {
        ...state,
        roommates: [],
        count: 0,
        isEnd: false,
        last: null,
      };
    case ADD_MY_POST:
      return {
        ...state,
        myPost: action.payload,
      };
    case UPDATE_MY_POST:
      return {
        ...state,
        myPost: [...action.payload],
      };
    case UPDATE_POST:
      return {
        ...state,
        roommates: [...action.payload],
      };
    default:
      return state;
  }
};

export default roommateReducer;
