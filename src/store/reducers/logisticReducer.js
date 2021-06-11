import produce from 'immer';
import {
  LOGISTIC_SET_END,
  LOGISTIC_SET_LAST,
  LOGISTIC_RELOAD_LIST,
  FETCH_LOGISTIC_SUCCESS,
  FETCH_LOGISTIC_FAIL,
  FETCH_LOGISTIC,
  CREATE_LOGISTIC,
  CREATE_LOGISTIC_SUCCESS,
  CREATE_LOGISTIC_FAIL,
  UPDATE_LOGISTIC,
  UPDATE_LOGISTIC_SUCCESS,
  UPDATE_LOGISTIC_FAIL,
  FETCH_MY_LOGISTIC,
  FETCH_MY_LOGISTIC_SUCCESS,
  FETCH_MY_LOGISTIC_FAIL,
  DELETE_LOGISTIC,
  DELETE_LOGISTIC_SUCCESS,
  DELETE_LOGISTIC_FAIL,
  LOGISTIC_RESET_CREATE_LOGISTIC_STATUS,
  LOGISTIC_RESET_UPDATE_LOGISTIC_STATUS,
  LOGISTIC_RESET_DELETE_LOGISTIC_STATUS,
} from '../actions/types';
import {status} from '../../constants/constants';

const initialState = {
  logistics: [],
  myLogistics: [],
  count: 0,
  isEnd: false,
  last: null,
  fetchLogistics: {
    status: '',
    message: '',
  },
  fetchMyLogistics: {
    status: '',
    message: '',
  },
  createLogistic: {
    status: '',
    message: '',
  },
  updateLogistic: {
    status: '',
    message: '',
  },
  deleteLogistic: {
    status: '',
    message: '',
  },
};

const logisticReducer = (state = initialState, {type, payload}) => {
  return produce(state, draft => {
    switch (type) {
      case FETCH_LOGISTIC:
        draft.fetchLogistics.status = status.PENDING;
        draft.fetchLogistics.message = '';
        break;
      case FETCH_LOGISTIC_SUCCESS:
        draft.fetchLogistics.status = status.SUCCESS;
        draft.fetchLogistics.message = '';
        draft.count += payload.length;
        draft.logistics = [...draft.logistics, ...payload];
        break;
      case FETCH_LOGISTIC_FAIL:
        draft.fetchLogistics.status = status.FAIL;
        draft.fetchLogistics.message = payload;
        break;

      case FETCH_MY_LOGISTIC:
        draft.fetchMyLogistics.status = status.PENDING;
        draft.fetchMyLogistics.message = '';
        break;
      case FETCH_MY_LOGISTIC_SUCCESS:
        draft.fetchMyLogistics.status = status.SUCCESS;
        draft.fetchMyLogistics.message = '';
        draft.myLogistics = [...payload];
        break;
      case FETCH_MY_LOGISTIC_FAIL:
        draft.fetchMyLogistics.status = status.FAIL;
        draft.fetchMyLogistics.message = payload;
        break;

      case CREATE_LOGISTIC:
        draft.createLogistic.status = status.PENDING;
        draft.createLogistic.message = '';
        break;
      case CREATE_LOGISTIC_SUCCESS:
        draft.createLogistic.status = status.SUCCESS;
        draft.createLogistic.message = '';
        draft.count += 1;
        draft.logistics = [payload, ...draft.logistics];
        break;
      case CREATE_LOGISTIC_FAIL:
        draft.createLogistic.status = status.FAIL;
        draft.createLogistic.message = payload;
        break;
      case LOGISTIC_RESET_CREATE_LOGISTIC_STATUS:
        draft.createLogistic.status = '';
        draft.createLogistic.message = '';
        break;

      case UPDATE_LOGISTIC:
        draft.updateLogistic.status = status.PENDING;
        draft.updateLogistic.message = '';
        break;
      case UPDATE_LOGISTIC_SUCCESS:
        draft.updateLogistic.status = status.SUCCESS;
        draft.updateLogistic.message = '';
        draft.logistics = produce(draft.logistics, d => {
          const index = d.findIndex(item => item.id === payload.id);
          if (index !== -1) {
            d[index] = payload;
          }
        });
        draft.myLogistics = produce(draft.myLogistics, d => {
          const index = d.findIndex(item => item.id === payload.id);
          if (index !== -1) {
            d[index] = payload;
          }
        });
        break;
      case UPDATE_LOGISTIC_FAIL:
        draft.updateLogistic.status = status.FAIL;
        draft.updateLogistic.message = payload;
        break;
      case LOGISTIC_RESET_UPDATE_LOGISTIC_STATUS:
        draft.updateLogistic.status = '';
        draft.updateLogistic.message = '';
        break;

      case DELETE_LOGISTIC:
        draft.deleteLogistic.status = status.PENDING;
        draft.deleteLogistic.message = '';
        break;
      case DELETE_LOGISTIC_SUCCESS:
        draft.deleteLogistic.status = status.SUCCESS;
        draft.deleteLogistic.message = '';
        draft.logistics = draft.myLogistics.filter(item => item.id !== payload);
        draft.myLogistics = draft.myLogistics.filter(
          item => item.id !== payload,
        );
        break;
      case DELETE_LOGISTIC_FAIL:
        draft.deleteLogistic.status = status.FAIL;
        draft.deleteLogistic.message = payload;
        break;
      case LOGISTIC_RESET_DELETE_LOGISTIC_STATUS:
        draft.deleteLogistic.status = '';
        draft.deleteLogistic.message = '';
        break;

      case LOGISTIC_SET_END:
        draft.fetchLogistics.status = status.SUCCESS;
        draft.fetchLogistics.message = '';
        draft.isEnd = payload;
        break;
      case LOGISTIC_SET_LAST:
        draft.last = payload;
        break;
      case LOGISTIC_RELOAD_LIST:
        draft.logistics = [];
        draft.count = 0;
        draft.isEnd = false;
        draft.last = null;
        break;
      default:
        break;
    }
  });
};

export default logisticReducer;
