import {combineReducers} from 'redux';

import userReducer from './userReducer';
import loginReducer from './loginReducer';
import innReducer from './innReducer';
import logisticReducer from './logisticReducer';

const allReducers = combineReducers({
  userReducer,
  loginReducer,
  innReducer,
  logisticReducer,
});

export default allReducers;
