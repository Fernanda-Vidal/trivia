import { ADD_ASSERTATIONS, ADD_SCORE, ADD_USEREMAIL, ADD_USERNAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatar: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USERNAME:
    return ({ ...state, name: action.payload });
  case ADD_ASSERTATIONS:
    return ({ ...state, assertions: state.assertions + 1 });
  case ADD_SCORE:
    return ({
      ...state,
      score: state.score + action.score });
  case ADD_USEREMAIL:
    return ({ ...state, gravatar: action.payload });
  default: return state;
  }
};

export default player;
