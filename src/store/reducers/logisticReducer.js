import {
  ADD_LOGISTIC,
  LOGISTIC_IS_LOADING,
  LOGISTIC_SET_END,
} from '../actions/types';

const logisticReducer = (
  state = {
    logistics: [],
    count: 0,
    isLoading: false,
    isEnd: false,
  },
  action,
) => {
  switch (action.type) {
    case ADD_LOGISTIC:
      return {
        ...state,
        count: state.count + action.payload?.length,
        logistics: [...state.logistics, ...action.payload],
        isLoading: false,
      };
    case LOGISTIC_SET_END:
      return {
        ...state,
        isEnd: action.payload,
      };
    case LOGISTIC_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default logisticReducer;
