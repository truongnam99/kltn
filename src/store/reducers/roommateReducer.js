import {produce} from 'immer';
import {status} from '../../constants/constants';
import {
  ROOMMATE_SET_END,
  ROOMMATE_SET_LAST,
  ROOMMATE_RELOAD_LIST,
  FETCH_ROOMMATE_SUCCESS,
  FETCH_ROOMMATE_FAIL,
  FETCH_ROOMMATE,
  FETCH_MY_ROOMMATE,
  FETCH_MY_ROOMMATE_SUCCESS,
  FETCH_MY_ROOMMATE_FAIL,
  CREATE_ROOMMATE,
  CREATE_ROOMMATE_SUCCESS,
  CREATE_ROOMMATE_FAIL,
  UPDATE_ROOMMATE,
  UPDATE_ROOMMATE_SUCCESS,
  UPDATE_ROOMMATE_FAIL,
  DELETE_ROOMMATE,
  DELETE_ROOMMATE_SUCCESS,
  DELETE_ROOMMATE_FAIL,
  CHANGE_ROOMMATE_ACTIVE,
  CHANGE_ROOMMATE_ACTIVE_SUCCESS,
  CHANGE_ROOMMATE_ACTIVE_FAIL,
  RESET_CREATE_ROOMMATE_STATUS,
  RESET_FETCH_ROOMMATE_STATUS,
  RESET_UPDATE_ROOMMATE_STATUS,
  RESET_DELETE_ROOMMATE_STATUS,
} from '../actions/types';

const initialState = {
  roommates: [],
  myRoommates: [],
  count: 0,
  isEnd: false,
  last: null,
  fetchRoommate: {
    status: '',
    message: '',
  },
  fetchMyRoommate: {
    status: '',
    message: '',
  },
  createRoommate: {
    status: '',
    message: '',
  },
  updateRoommate: {
    status: '',
    message: '',
  },
  deleteRoommate: {
    status: '',
    message: '',
  },
  changeRoommateActive: {
    status: '',
    message: '',
  },
};

const roommateReducer = (state = initialState, {type, payload}) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_ROOMMATE:
        draft.fetchRoommate.status = status.PENDING;
        draft.fetchRoommate.message = '';
        break;
      case FETCH_ROOMMATE_SUCCESS:
        draft.fetchRoommate.status = status.SUCCESS;
        draft.fetchRoommate.message = '';
        draft.roommates = [...draft.roommates, ...payload];
        break;
      case FETCH_ROOMMATE_FAIL:
        draft.fetchRoommate.status = status.FAIL;
        draft.fetchRoommate.message = payload;
        break;

      case FETCH_MY_ROOMMATE:
        draft.fetchMyRoommate.status = status.PENDING;
        draft.fetchMyRoommate.message = '';
        break;
      case FETCH_MY_ROOMMATE_SUCCESS:
        draft.fetchMyRoommate.status = status.SUCCESS;
        draft.fetchMyRoommate.message = '';
        draft.myRoommates = payload;
        break;
      case FETCH_MY_ROOMMATE_FAIL:
        draft.fetchMyRoommate.status = status.FAIL;
        draft.fetchMyRoommate.message = payload;
        break;

      case CREATE_ROOMMATE:
        draft.createRoommate.status = status.PENDING;
        draft.createRoommate.message = '';
        break;
      case CREATE_ROOMMATE_SUCCESS:
        draft.createRoommate.status = status.SUCCESS;
        draft.createRoommate.message = '';
        draft.roommates = [payload, ...draft.roommates];
        draft.myRoommates = [payload, ...draft.myRoommates];
        break;
      case CREATE_ROOMMATE_FAIL:
        draft.createRoommate.status = status.FAIL;
        draft.createRoommate.message = payload;
        break;

      case UPDATE_ROOMMATE:
        draft.updateRoommate.status = status.PENDING;
        draft.updateRoommate.message = '';
        break;
      case UPDATE_ROOMMATE_SUCCESS:
        draft.updateRoommate.status = status.SUCCESS;
        draft.updateRoommate.message = '';
        draft.roommates = produce(draft.roommates, d => {
          const index = d.findIndex(item => item.id === payload.id);
          if (index !== -1) {
            d[index] = payload;
          }
        });
        draft.myRoommates = produce(draft.myRoommates, d => {
          const index = d.findIndex(item => item.id === payload.id);
          if (index !== -1) {
            d[index] = payload;
          }
        });
        break;
      case UPDATE_ROOMMATE_FAIL:
        draft.updateRoommate.status = status.FAIL;
        draft.updateRoommate.message = payload;
        break;

      case DELETE_ROOMMATE:
        draft.deleteRoommate.status = status.PENDING;
        draft.deleteRoommate.message = '';
        break;
      case DELETE_ROOMMATE_SUCCESS:
        draft.deleteRoommate.status = status.SUCCESS;
        draft.deleteRoommate.message = '';
        draft.roommates = draft.roommates.filter(item => item.id !== payload);
        draft.myRoommates = draft.myRoommates.filter(
          item => item.id !== payload,
        );
        break;
      case DELETE_ROOMMATE_FAIL:
        draft.deleteRoommate.status = status.FAIL;
        draft.deleteRoommate.message = payload;
        break;

      case CHANGE_ROOMMATE_ACTIVE:
        draft.changeRoommateActive.status = status.PENDING;
        draft.changeRoommateActive.message = '';
        break;
      case CHANGE_ROOMMATE_ACTIVE_SUCCESS:
        draft.changeRoommateActive.status = status.SUCCESS;
        draft.changeRoommateActive.message = '';
        draft.roommates = produce(draft.roommates, d => {
          const index = d.findIndex(item => item.id === payload.id);
          if (index !== -1) {
            d[index].isActive = payload.isActive;
          }
        });
        draft.myRoommates = produce(draft.myRoommates, d => {
          const index = d.findIndex(item => item.id === payload.id);
          if (index !== -1) {
            d[index].isActive = payload.isActive;
          }
        });
        break;
      case CHANGE_ROOMMATE_ACTIVE_FAIL:
        draft.changeRoommateActive.status = status.FAIL;
        draft.changeRoommateActive.message = payload;
        break;

      case RESET_FETCH_ROOMMATE_STATUS:
        draft.fetchRoommate.status = '';
        draft.fetchRoommate.message = '';
        break;
      case RESET_CREATE_ROOMMATE_STATUS:
        draft.createRoommate.status = '';
        draft.createRoommate.message = '';
        break;
      case RESET_UPDATE_ROOMMATE_STATUS:
        draft.updateRoommate.status = '';
        draft.updateRoommate.message = '';
        break;
      case RESET_DELETE_ROOMMATE_STATUS:
        draft.deleteRoommate.status = '';
        draft.deleteRoommate.message = '';
        break;

      case ROOMMATE_SET_END:
        draft.isEnd = payload;
        break;
      case ROOMMATE_SET_LAST:
        draft.last = payload;
        break;
      case ROOMMATE_RELOAD_LIST:
        draft.roommates = [];
        draft.count = 0;
        draft.isEnd = false;
        draft.last = null;
        break;
      default:
        break;
    }
  });

export default roommateReducer;
