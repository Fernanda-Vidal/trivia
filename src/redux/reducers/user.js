const INITIAL_STATE = {
  userName: '',
  email: '',
  token: {},
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_USER':
    return ({ ...state,
      userName: action.payload,
      email: action.payload,
      token: action.payload });
  default:
    return state;
  }
};

export default loginReducer;
