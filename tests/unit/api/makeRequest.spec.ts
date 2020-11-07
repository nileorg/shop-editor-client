import makeRequest from '@/api/makeRequest';

const fetchMock = jest.fn();
globalThis.fetch = fetchMock;

beforeEach(() => {
  fetchMock.mockReset();
});

it('should fetch the given path', async () => {
  fetchMock.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(),
  } as Response);
  await makeRequest('/foo');
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith(
    'http://shop-editor.castignoli.it/foo',
    { method: 'GET', headers: {} },
  );
});

it('should stringify the request body', async () => {
  fetchMock.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(),
  } as Response);
  const expected = '{"bar":"baz"}';
  await makeRequest('foo', { body: { bar: 'baz' } });
  const { body: actual } = fetchMock.mock.calls[0][1] as RequestInit;
  expect(actual).toBe(expected);
});

it('should send data as JSON', async () => {
  fetchMock.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(),
  } as Response);
  const expected = 'application/json';
  await makeRequest('/foo', { body: { bar: 'baz' } });
  const { headers } = fetchMock.mock.calls[0][1] as RequestInit;
  const actual = (headers as { 'Content-Type': string })['Content-Type'];
  expect(actual).toBe(expected);
});

it('should send the authentication token', async () => {
  fetchMock.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(),
  } as Response);

  const expected = { Authentication: 'Bearer bar' };
  await makeRequest('/foo', { authenticationToken: 'bar' });
  const { headers: actual } = fetchMock.mock.calls[0][1] as RequestInit;
  expect(actual).toStrictEqual(expected);
});

it('should fail when response is not OK', async () => {
  fetchMock.mockResolvedValue({ ok: false } as unknown as Response);
  await expect(makeRequest('/foo')).rejects.toBeInstanceOf(Error);
});

it('should provide the response parsed body', async () => {
  fetchMock.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ bar: 'baz' }),
  } as Response);
  const expected = { bar: 'baz' };
  const actual = await makeRequest('/foo');
  expect(actual).toStrictEqual(expected);
});

it('should provide the response text body', async () => {
  fetchMock.mockResolvedValue({
    ok: true,
    text: () => Promise.resolve('bar'),
  } as Response);
  const expected = 'bar';
  const actual = await makeRequest('/foo', { testResponse: true });
  expect(actual).toBe(expected);
});

afterAll(() => {
  fetchMock.mockRestore();
});
