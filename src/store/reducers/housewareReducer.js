import {produce} from 'immer';
import {
  FETCH_HOUSEWARES,
  FETCH_HOUSEWARES_FAIL,
  FETCH_HOUSEWARES_SUCCESS,
  FETCH_MY_HOUSEWARES,
  FETCH_MY_HOUSEWARES_FAIL,
  FETCH_MY_HOUSEWARES_SUCCESS,
  HOUSEWARE_CREATE_POST,
  HOUSEWARE_CREATE_POST_FAIL,
  HOUSEWARE_CREATE_POST_SUCCESS,
  RESET_CREATE_HOUSEWARE_STATUS,
  RESET_LIST_HOUSEWARES,
  RESET_UPDATE_HOUSEWARE_STATUS,
  SET_END_OF_HOUSEWARES,
  SET_FETCH_HOUSEWARES,
  SET_LAST_HOUSEWARE,
  UPDATE_HOUSEWARE,
  UPDATE_HOUSEWARE_FAIL,
  UPDATE_HOUSEWARE_IS_ACTIVE,
  UPDATE_HOUSEWARE_IS_ACTIVE_FAIL,
  UPDATE_HOUSEWARE_IS_ACTIVE_SUCCESS,
  UPDATE_HOUSEWARE_SUCCESS,
} from '../actions/types';
import {status} from '../../constants/constants';

const initialState = {
  housewares: [],
  createHouseware: {
    status: '',
    message: '',
  },
  fetchHousewares: {
    status: '',
    message: '',
  },
  last: null,
  endOfHousewares: false,
  myHousewares: [],
  fetchMyHousewares: {
    status: '',
    message: '',
  },
  updateHousewareIsActive: {
    status: '',
    message: '',
  },
  updateHouseware: {
    status: '',
    message: '',
  },
};

export const housewareReducer = (state = initialState, {type, payload}) => {
  return produce(state, draft => {
    switch (type) {
      case HOUSEWARE_CREATE_POST:
        draft.createHouseware.status = status.PENDING;
        break;
      case HOUSEWARE_CREATE_POST_SUCCESS:
        draft.housewares = [payload, ...draft.housewares];
        draft.createHouseware.status = status.SUCCESS;
        break;
      case HOUSEWARE_CREATE_POST_FAIL:
        draft.createHouseware.status = status.FAIL;
        draft.createHouseware.message = 'Lỗi tạo post';
        break;
      case RESET_CREATE_HOUSEWARE_STATUS:
        draft.createHouseware.status = '';
        draft.createHouseware.message = '';
        break;
      case FETCH_HOUSEWARES:
        draft.fetchHousewares.status = status.PENDING;
        break;
      case FETCH_HOUSEWARES_SUCCESS:
        draft.fetchHousewares.status = status.SUCCESS;
        draft.housewares = [...draft.housewares, ...payload];
        break;
      case FETCH_HOUSEWARES_FAIL:
        draft.fetchHousewares.status = status.FAIL;
        draft.fetchHousewares.message = payload;
        break;
      case SET_END_OF_HOUSEWARES:
        draft.endOfHousewares = true;
        draft.fetchHousewares.status = status.SUCCESS;
        break;
      case RESET_LIST_HOUSEWARES:
        draft.housewares = [];
        draft.last = null;
        draft.endOfHousewares = false;
        break;
      case SET_LAST_HOUSEWARE:
        draft.last = payload;
        break;
      case SET_FETCH_HOUSEWARES:
        draft.fetchHousewares = payload;
        break;
      case FETCH_MY_HOUSEWARES:
        draft.fetchMyHousewares.status = status.PENDING;
        break;
      case FETCH_MY_HOUSEWARES_SUCCESS:
        draft.myHousewares = [...payload];
        draft.fetchMyHousewares.status = status.SUCCESS;
        break;
      case FETCH_MY_HOUSEWARES_FAIL:
        draft.fetchMyHousewares.status = status.FAIL;
        draft.fetchMyHousewares.message = payload;
        break;
      case UPDATE_HOUSEWARE_IS_ACTIVE:
        draft.updateHousewareIsActive.status = status.PENDING;
        break;
      case UPDATE_HOUSEWARE_IS_ACTIVE_SUCCESS:
        draft.updateHousewareIsActive.status = status.SUCCESS;
        const myHouseware = draft.myHousewares.find(
          item => item.id === payload.id,
        );
        if (myHouseware) {
          myHouseware.isActive = payload.isActive;
        }
        if (payload.isActive) {
          return;
        }
        const housewareIndex = draft.housewares.findIndex(
          item => item.id === payload.id,
        );
        if (housewareIndex !== -1) {
          draft.housewares.splice(housewareIndex, 1);
        }
        break;
      case UPDATE_HOUSEWARE_IS_ACTIVE_FAIL:
        draft.updateHousewareIsActive.status = status.FAIL;
        draft.updateHousewareIsActive.message = payload;
        break;
      case UPDATE_HOUSEWARE:
        draft.updateHouseware.status = status.PENDING;
        break;
      case UPDATE_HOUSEWARE_SUCCESS:
        draft.updateHouseware.status = status.SUCCESS;
        const myHousewareIdx = draft.myHousewares.findIndex(
          item => item.id === payload.id,
        );
        if (myHousewareIdx !== -1) {
          draft.myHousewares[myHousewareIdx] = payload;
        }
        const housewareIdx = draft.housewares.findIndex(
          item => item.id === payload.id,
        );
        if (housewareIdx !== -1) {
          draft.housewares[housewareIdx] = payload;
        }
        break;
      case UPDATE_HOUSEWARE_FAIL:
        draft.updateHouseware.status = status.FAIL;
        draft.updateHouseware.message = payload;
        break;
      case RESET_UPDATE_HOUSEWARE_STATUS:
        draft.updateHouseware.status = '';
        draft.updateHouseware.message = '';
        break;
    }
  });
};
