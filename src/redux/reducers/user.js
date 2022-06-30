import { ADD_USERNAME, ADD_USEREMAIL, ADD_USERTOKEN } from '../actions';

const INITIAL_STATE = {
  userName: '',
  userEmail: '',
  token: {},
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USERNAME:
    return ({ ...state, userName: action.payload });
  case ADD_USEREMAIL:
    return ({ ...state, userEmail: action.payload });
  case ADD_USERTOKEN:
    return ({ ...state, token: action.payload });
  default:
    return state;
  }
};

export default loginReducer;
