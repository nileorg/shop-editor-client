import assertResponseIsValid from '@/api/assertResponseIsValid';

it('should not fail when the response is OK', () => {
  const response = { ok: true } as Response;
  expect(() => assertResponseIsValid(response)).not.toThrowError();
});

it('should fail when the response is not OK', () => {
  const response = { ok: false } as Response;
  expect(() => assertResponseIsValid(response)).toThrowError();
});

it('should report the URL and the status', () => {
  const response = {
    ok: false,
    url: 'https://foo.com',
    status: 500,
    statusText: 'Internal Server Error',
  } as Response;

  expect(() => assertResponseIsValid(response)).toThrowError(/https:\/\/foo.com/);
  expect(() => assertResponseIsValid(response)).toThrowError(/500/);
  expect(() => assertResponseIsValid(response)).toThrowError(/Internal Server Error/);
});
