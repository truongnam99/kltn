import {
  ADD_INN,
  ADD_MY_INN,
  INN_RELOAD_LIST,
  INN_SET_lAST,
  INN_SHOW_LOADING,
  SET_IS_END,
  UPDATE_INNS,
  UPDATE_MY_INNS,
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
        isLoading: false,
      };
    case ADD_INN:
      return {
        ...state,
        count: state.count + action.payload?.length,
        inns: action.payload.setToFirst
          ? [action.payload.data, ...state.inns]
          : [...state.inns, ...action.payload],
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
        inns: [],
        count: 0,
        isEnd: false,
        last: null,
      };
    case ADD_MY_INN:
      return {
        ...state,
        myInns: action.payload,
      };
    case UPDATE_INNS:
      return {
        ...state,
        inns: [...action.payload],
      };
    case UPDATE_MY_INNS:
      return {
        ...state,
        myInns: [...action.payload],
      };
    default:
      return state;
  }
};

export default innReducer;
