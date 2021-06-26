import auth from '@react-native-firebase/auth';
import {status} from '../../constants/constants';

import {
  SET_USER,
  SET_USER_CREDENTIAL,
  LOGOUT,
  UPDATE_USER,
  RESET_UPDATE_USER_STATUS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../actions/types';

const initialState = {
  userInfo: null,
  userCredential: auth().currentUser,
  updateStatus: {
    status: '',
    message: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_USER_CREDENTIAL:
      return {
        ...state,
        userCredential: action.payload,
      };
    case LOGOUT:
      return {
        userInfo: null,
        userCredential: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        updateStatus: {
          status: status.PENDING,
          message: '',
        },
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        updateStatus: {
          status: status.SUCCESS,
          message: '',
        },
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        updateStatus: {
          status: status.FAIL,
          message: action.payload,
        },
      };
    case RESET_UPDATE_USER_STATUS:
      return {
        ...state,
        updateStatus: {
          status: '',
          message: '',
        },
      };
    default:
      return state;
  }
};

export default userReducer;
