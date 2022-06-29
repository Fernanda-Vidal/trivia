const getApiToken = async () => {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(`${ENDPOINT}`);
  const json = await response.json();
  console.log(json);

  return json;
};

export default getApiToken;
