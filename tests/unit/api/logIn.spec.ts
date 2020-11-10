import logIn from '@/api/logIn';

const originalFetch = globalThis.fetch;
const mockFetch = jest.fn();

beforeAll(() => {
  globalThis.fetch = mockFetch;
});

beforeEach(() => {
  mockFetch.mockReset();
});

it('should call the login endpoint', async () => {
  const mockResponse = {
    ok: true,
    text: jest.fn(),
  } as unknown as Response;
  mockFetch.mockResolvedValueOnce(mockResponse);

  await logIn('', '');

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/auth\/login/),
    expect.anything(),
  );
});

it('should make a POST request', async () => {
  const mockResponse = {
    ok: true,
    text: jest.fn(),
  } as unknown as Response;
  mockFetch.mockResolvedValueOnce(mockResponse);

  await logIn('', '');

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    expect.any(String),
    expect.objectContaining({ method: 'POST' }),
  );
});

it('should send a JSON object', async () => {
  const mockResponse = {
    ok: true,
    text: jest.fn(),
  } as unknown as Response;
  mockFetch.mockResolvedValueOnce(mockResponse);

  await logIn('', '');

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    expect.any(String),
    expect.objectContaining({
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
});

it('should send user credentials', async () => {
  const username = 'foo';
  const verificationCode = 'bar';

  const mockResponse = {
    ok: true,
    text: jest.fn(),
  } as unknown as Response;
  mockFetch.mockResolvedValueOnce(mockResponse);

  await logIn(username, verificationCode);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    expect.any(String),
    expect.objectContaining({
      body: '{"username":"foo","verification_code":"bar"}',
    }),
  );
});

it('should fail when the response is not OK', () => {
  const mockResponse = {
    ok: false,
  } as unknown as Response;
  mockFetch.mockResolvedValueOnce(mockResponse);

  expect(logIn('', '')).rejects.toBeInstanceOf(Error);
});

it('should retrieve the response body', async () => {
  const mockText = jest.fn();
  const mockResponse = {
    ok: true,
    text: mockText,
  } as unknown as Response;
  mockFetch.mockResolvedValueOnce(mockResponse);

  await logIn('', '');

  expect(mockText).toHaveBeenCalledTimes(1);
});

it('should provide the authentication token', async () => {
  const mockResponse = {
    ok: true,
    text: jest.fn().mockResolvedValueOnce('foo'),
  } as unknown as Response;
  mockFetch.mockResolvedValueOnce(mockResponse);

  const expected = 'foo';
  const actual = await logIn('', '');

  expect(actual).toBe(expected);
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});
