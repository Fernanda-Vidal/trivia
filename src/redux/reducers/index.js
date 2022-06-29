import { combineReducers } from 'redux';
import loginReducer from './user';
import questionsReducer from './questions';

const rootReducer = combineReducers({
  loginReducer,
  questionsReducer,
});

export default rootReducer;
