import {
  ADD_INN,
  INN_RELOAD_LIST,
  INN_SET_lAST,
  INN_SHOW_LOADING,
  SET_IS_END,
} from '../actions/types';

const innReducer = (
  state = {
    inns: [],
    count: 0,
    isLoading: false,
    isEnd: false,
    last: null,
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
    case INN_SET_lAST:
      return {
        ...state,
        last: action.payload,
      };
    case INN_RELOAD_LIST:
      return {
        ...state,
        logistics: [],
        count: 0,
        isEnd: false,
        last: null,
      };
    default:
      return state;
  }
};

export default innReducer;
