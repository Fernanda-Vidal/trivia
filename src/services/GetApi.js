export const getApiToken = async () => {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(`${ENDPOINT}`);
  const json = await response.json();
  localStorage.setItem('token', json.token);

  return json;
};

export const getQuestions = async (token) => {
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(`${ENDPOINT}`);
  const json = await response.json();

  return json;
};
