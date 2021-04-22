import {ADD_INN, INN_SHOW_LOADING} from '../actions/types';

const innReducer = (
  state = {
    inns: [],
    count: 0,
    isLoading: false,
  },
  action,
) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default innReducer;
