import assertResponseIsValid from './assertResponseIsValid';

// eslint-disable-next-line @typescript-eslint/camelcase
export default async (username: string, verification_code: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      verification_code, // eslint-disable-line @typescript-eslint/camelcase
    }),
  };
  const response = await fetch(`${process.env.VUE_APP_SHOP_API_BASE_URL}/auth/login`, options);
  assertResponseIsValid(response);
  return response.text();
};
