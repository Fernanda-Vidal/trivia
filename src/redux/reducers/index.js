import { combineReducers } from 'redux';
import loginReducer from './user';

const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;
