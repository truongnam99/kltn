import {combineReducers} from 'redux';

import userReducer from './userReducer';
import loginReducer from './loginReducer';
import innReducer from './innReducer';
import logisticReducer from './logisticReducer';
import messageReducer from './messageReducer';

const allReducers = combineReducers({
  userReducer,
  loginReducer,
  innReducer,
  logisticReducer,
  messageReducer,
});

export default allReducers;
