import {combineReducers} from 'redux';

import userReducer from './userReducer';
import loginReducer from './loginReducer';

const allReducers = combineReducers({
  userReducer,
  loginReducer,
});

export default allReducers;
