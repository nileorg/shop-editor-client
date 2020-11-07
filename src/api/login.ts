import makeRequest from './makeRequest';

export default async (username: string, verificationCode: string): Promise<string> => {
  const authenticationToken = await makeRequest('/auth/login', {
    method: 'POST',
    body: {
      username,
      verification_code: verificationCode,
    },
    testResponse: true,
  });
  return authenticationToken as string;
};
