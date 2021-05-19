import {produce} from 'immer';
import {
  FETCH_HOUSEWARES,
  FETCH_HOUSEWARES_FAIL,
  FETCH_HOUSEWARES_SUCCESS,
  HOUSEWARE_CREATE_POST,
  HOUSEWARE_CREATE_POST_FAIL,
  HOUSEWARE_CREATE_POST_SUCCESS,
  RESET_LIST_HOUSEWARES,
  SET_END_OF_HOUSEWARES,
  SET_FETCH_HOUSEWARES,
  SET_LAST_HOUSEWARE,
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
    }
  });
};
