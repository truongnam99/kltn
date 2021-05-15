import {
  ADD_LOGISTIC,
  LOGISTIC_IS_LOADING,
  LOGISTIC_SET_END,
  LOGISTIC_SET_LAST,
  LOGISTIC_RELOAD_LIST,
  ADD_MY_LOGISTIC,
  UPDATE_LOGISTIC,
  UPDATE_MY_LOGISTIC,
} from '../actions/types';

const logisticReducer = (
  state = {
    logistics: [],
    count: 0,
    isLoading: false,
    isEnd: false,
    last: null,
  },
  action,
) => {
  switch (action.type) {
    case ADD_LOGISTIC:
      return {
        ...state,
        count: state.count + action.payload?.length,
        logistics: action.payload.setToFirst
          ? [action.payload.data, ...state.logistics]
          : [...state.logistics, ...action.payload],
        isLoading: false,
      };
    case LOGISTIC_SET_END:
      return {
        ...state,
        isLoading: false,
        isEnd: action.payload,
      };
    case LOGISTIC_SET_LAST:
      return {
        ...state,
        last: action.payload,
      };
    case LOGISTIC_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case LOGISTIC_RELOAD_LIST:
      return {
        ...state,
        logistics: [],
        count: 0,
        isEnd: false,
        last: null,
      };
    case ADD_MY_LOGISTIC:
      return {
        ...state,
        myLogistics: action.payload,
      };
    case UPDATE_LOGISTIC:
      return {
        ...state,
        logistics: action.payload,
      };
    case UPDATE_MY_LOGISTIC:
      return {
        ...state,
        myLogistics: action.payload,
      };
    default:
      return state;
  }
};

export default logisticReducer;
