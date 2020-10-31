import makeRequest from '@/api/makeRequest';

it('should fetch the given path', async () => {
  const path = '/foo';
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({}),
  } as unknown as Response);
  await makeRequest(path);
  expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  expect(globalThis.fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/foo`, { method: 'GET' });
});

it('should stringify the request body', async () => {
  const path = '/foo';
  const body = { bar: 'baz' };
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({}),
  } as unknown as Response);
  await makeRequest(path, { body });
  const expected = '{"bar":"baz"}';
  const { body: actual } = (globalThis.fetch as jest.Mock).mock.calls[0][1];
  expect(actual).toBe(expected);
});

it('should fail when response is not OK', async () => {
  const path = '/foo';
  globalThis.fetch = jest.fn().mockResolvedValue({ ok: false } as unknown as Response);
  await expect(makeRequest(path)).rejects.toBeInstanceOf(Error);
});

it('should provide the response parsed body', async () => {
  const path = '/foo';
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ bar: 'baz' }),
  } as unknown as Response);
  const expected = { bar: 'baz' };
  const actual = await makeRequest(path);
  expect(actual).toStrictEqual(expected);
});
