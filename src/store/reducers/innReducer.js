import {
  ADD_INN,
  INN_SHOW_LOADING,
  REMOVE_ALL_INN,
  SET_IS_END,
} from '../actions/types';

const innReducer = (
  state = {
    inns: [],
    count: 0,
    isLoading: false,
    isEnd: false,
  },
  action,
) => {
  switch (action.type) {
    case SET_IS_END:
      return {
        ...state,
        isEnd: action.payload,
      };
    case ADD_INN:
      return {
        ...state,
        count: state.count + action.payload?.length,
        inns: [...state.inns, ...action.payload],
        isLoading: false,
      };
    case INN_SHOW_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case REMOVE_ALL_INN:
      return {
        ...state,
        inns: [],
        count: 0,
        isEnd: true,
      };

    default:
      return state;
  }
};

export default innReducer;
