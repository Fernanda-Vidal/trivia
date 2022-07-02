import { combineReducers } from 'redux';
import loginReducer from './user';
import questionsReducer from './questions';
import player from './player';

const rootReducer = combineReducers({
  loginReducer,
  questionsReducer,
  player,
});

export default rootReducer;
