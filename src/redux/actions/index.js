import { getApiToken /* getQuestions */ } from '../../services/GetApi';

export const ADD_USERNAME = 'ADD_USERNAME';
export const ADD_USEREMAIL = 'ADD_USEREMAIL';
export const ADD_USERTOKEN = 'ADD_USERTOKEN';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const ADD_ASSERTATIONS = 'ADD_ASSERTATIONS';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_GRAVATAR = 'ADD_GRAVATAR';
export const CLEAR_SCORE = 'CLEAR_SCORE';

export const addUserName = (user) => ({
  type: ADD_USERNAME,
  payload: user,
});

export const addUserEmail = (email) => ({
  type: ADD_USEREMAIL,
  payload: email,
});

export const addUserToken = (token) => ({
  type: ADD_USERTOKEN,
  payload: token,
});

export const addQuestions = (question) => ({
  type: ADD_QUESTIONS,
  payload: question,
});

export function getToken() {
  return async (dispatch) => {
    await getApiToken().then((resp) => {
      dispatch(addUserToken(resp));
    });
  };
}

export const addAssertations = () => ({
  type: ADD_ASSERTATIONS,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const clearScore = () => ({
  type: CLEAR_SCORE,
});
