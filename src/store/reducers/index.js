import {combineReducers} from 'redux';

import userReducer from './userReducer';
import loginReducer from './loginReducer';
import innReducer from './innReducer';

const allReducers = combineReducers({
  userReducer,
  loginReducer,
  innReducer,
});

export default allReducers;
