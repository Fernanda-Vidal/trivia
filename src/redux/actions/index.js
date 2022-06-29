import getApiToken from '../../services/GetApi';

export const addUserName = (user) => ({
  type: 'ADD_USERNAME',
  payload: user,
});

export const addUserEmail = (email) => ({
  type: 'ADD_USEREMAIL',
  payload: email,
});

export const addUserToken = (token) => ({
  type: 'ADD_USERTOKEN',
  payload: token,
});

export function getToken() {
  return async (dispatch) => {
    getApiToken().then((resp) => {
      dispatch(addUserToken(resp));
    });
  };
}
