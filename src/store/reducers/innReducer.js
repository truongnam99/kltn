import {produce} from 'immer';
import {
  INN_RELOAD_LIST,
  INN_SET_lAST,
  INN_SHOW_LOADING,
  SET_IS_END,
  UPDATE_INNS,
  UPDATE_MY_INNS,
  FETCH_INN,
  FETCH_INN_SUCCESS,
  FETCH_INN_FAIL,
  CREATE_INN,
  CREATE_INN_SUCCESS,
  CREATE_INN_FAIL,
  FETCH_MY_INN,
  FETCH_MY_INN_SUCCESS,
  FETCH_MY_INN_FAIL,
  DELETE_INN,
  DELETE_INN_SUCCESS,
  DELETE_INN_FAIL,
} from '../actions/types';
import {status} from '../../constants/constants';

const initialState = {
  inns: [],
  myInns: [],
  count: 0,
  isLoading: false,
  isEnd: false,
  last: null,
  fetchInns: {
    status: '',
    message: '',
  },
  fetchMyInns: {
    status: '',
    message: '',
  },
  createInn: {
    status: '',
    message: '',
  },
  deleteInn: {
    status: '',
    message: '',
  },
};

const innReducer = (state = initialState, {type, payload}) => {
  return produce(state, draft => {
    switch (type) {
      case FETCH_INN:
        draft.fetchInns.status = status.PENDING;
        break;
      case FETCH_INN_SUCCESS:
        draft.fetchInns.status = status.SUCCESS;
        draft.inns = [...draft.inns, ...payload];
        draft.count = draft.count + payload.length;
        break;
      case FETCH_INN_FAIL:
        draft.fetchInns.status = status.FAIL;
        draft.fetchInns.message = payload;
        break;

      case FETCH_MY_INN:
        draft.fetchMyInns.status = status.PENDING;
        break;
      case FETCH_MY_INN_SUCCESS:
        draft.fetchMyInns.status = status.SUCCESS;
        draft.fetchMyInns.message = '';
        draft.myInns = payload;
        break;
      case FETCH_MY_INN_FAIL:
        draft.fetchMyInns.status = status.FAIL;
        draft.fetchMyInns.message = payload;
        break;

      case CREATE_INN:
        draft.createInn.status = status.PENDING;
        break;
      case CREATE_INN_SUCCESS:
        draft.createInn.status = status.SUCCESS;
        draft.createInn.message = '';
        draft.inns = [payload, ...draft.inns];
        draft.count = draft.count + 1;
        break;
      case CREATE_INN_FAIL:
        draft.createInn.status = status.FAIL;
        draft.createInn.message = payload;
        break;

      case DELETE_INN:
        draft.deleteInn.status = status.PENDING;
        break;
      case DELETE_INN_SUCCESS:
        draft.deleteInn.status = status.SUCCESS;
        draft.deleteInn.message = '';
        draft.inns = draft.inns.filter(item => item.uid !== payload);
        draft.myInns = draft.myInns.filter(item => item.uid !== payload);
        draft.count = draft.count - 1;
        break;
      case DELETE_INN_FAIL:
        draft.deleteInn.status = status.FAIL;
        draft.deleteInn.message = payload;
        break;

      case INN_SHOW_LOADING:
        draft.isLoading = payload;
        break;
      case INN_SET_lAST:
        draft.last = payload;
        break;
      case INN_RELOAD_LIST:
        draft.inns = [];
        draft.count = 0;
        draft.isEnd = false;
        draft.last = null;
        break;
      case UPDATE_INNS:
        draft.inns = [...payload];
        break;
      case UPDATE_MY_INNS:
        draft.createInn.status = status.SUCCESS;
        draft.createInn.message = '';
        draft.myInns = [...payload];
        break;
      case SET_IS_END:
        draft.isEnd = payload;
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });
};

export default innReducer;
