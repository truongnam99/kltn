import auth from '@react-native-firebase/auth';

import {SET_USER, SET_USER_CREDENTIAL} from '../actions/types';

const userReducer = (
  state = {
    userInfo: null,
    userCredential: auth().currentUser,
  },
  action,
) => {
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
    default:
      return state;
  }
};

export default userReducer;
