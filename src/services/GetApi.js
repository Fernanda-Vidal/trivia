const getApiToken = async () => {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(`${ENDPOINT}`);
  const json = await response.json();
  localStorage.setItem('token', json.token);
  console.log(json.token);

  return json;
};

export default getApiToken;
