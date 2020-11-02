import makeRequest from './makeRequest';

export default async (username: string, verificationCode: string) => {
  const authenticationToken = await makeRequest('/auth/login', {
    method: 'POST',
    body: {
      username,
      verification_code: verificationCode, // eslint-disable-line @typescript-eslint/camelcase
    },
    testResponse: true,
  });
  return authenticationToken;
};
