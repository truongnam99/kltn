import {combineReducers} from 'redux';

import userReducer from './userReducer';
import loginReducer from './loginReducer';
import innReducer from './innReducer';
import logisticReducer from './logisticReducer';
import messageReducer from './messageReducer';
import roommateReducer from './roommateReducer';

const allReducers = combineReducers({
  userReducer,
  loginReducer,
  innReducer,
  logisticReducer,
  messageReducer,
  roommateReducer,
});

export default allReducers;
