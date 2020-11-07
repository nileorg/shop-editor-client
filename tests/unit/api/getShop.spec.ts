import getShop from '@/api/getShop';
import makeRequest from '@/api/makeRequest';

jest.mock('@/api/makeRequest');

beforeEach(() => {
  (makeRequest as jest.Mock).mockReset();
});

it('should request the shop for the current user', async () => {
  await getShop('foo');
  expect(makeRequest).toHaveBeenCalledTimes(1);
  expect(makeRequest).toHaveBeenCalledWith('/shop', { authenticationToken: 'foo' });
});

afterAll(() => {
  (makeRequest as jest.Mock).mockRestore();
});
