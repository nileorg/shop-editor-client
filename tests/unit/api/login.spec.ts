import login from '@/api/login';
import makeRequest from '@/api/makeRequest';

jest.mock('@/api/makeRequest');

it('should call the login API', async () => {
  const username = 'foo';
  const verificationCode = 'bar';
  await login(username, verificationCode);
  const expected = '/auth/login';
  const actual = (makeRequest as jest.Mock).mock.calls[0][0];
  expect(makeRequest).toHaveBeenCalledTimes(1);
  expect(actual).toBe(expected);
});

it('should send the given credentials', async () => {
  const username = 'foo';
  const verificationCode = 'bar';
  await login(username, verificationCode);
  const expected = {
    username: 'foo',
    verification_code: 'bar',
  };
  const { body: actual } = (makeRequest as jest.Mock).mock.calls[0][1];
  expect(actual).toStrictEqual(expected);
});

it('should ask for a text response', async () => {
  const username = 'foo';
  const verificationCode = 'bar';
  await login(username, verificationCode);
  const expected = true;
  const { testResponse: actual } = (makeRequest as jest.Mock).mock.calls[0][1];
  expect(actual).toBe(expected);
});

it('should send a POST request', async () => {
  const username = 'foo';
  const verificationCode = 'bar';
  await login(username, verificationCode);
  const expected = 'POST';
  const { method: actual } = (makeRequest as jest.Mock).mock.calls[0][1];
  expect(actual).toBe(expected);
});

it('should provide the authentication token', async () => {
  const username = 'foo';
  const verificationCode = 'bar';
  (makeRequest as jest.Mock).mockResolvedValue('baz');
  const expected = 'baz';
  const actual = await login(username, verificationCode);
  expect(actual).toBe(expected);
});

afterEach(() => {
  (makeRequest as jest.Mock).mockReset();
});

afterAll(() => {
  (makeRequest as jest.Mock).mockRestore();
});
