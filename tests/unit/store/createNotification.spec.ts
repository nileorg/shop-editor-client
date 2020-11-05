import createNotification from '@/store/createNotification';
import generateId from '@/utils/generateId';

jest.mock('@/utils/generateId');

beforeEach(() => {
  (generateId as jest.Mock).mockReset();
});

it('should provide a notification with a random ID', () => {
  (generateId as jest.Mock).mockReturnValue('foo');
  const expected = 'foo';
  const { id: actual } = createNotification({ title: '', description: '' });
  expect(actual).toBe(expected);
});

it('should provide a notification with given title and description', () => {
  const input = { title: 'foo', description: 'bar' };
  const expected = { title: 'foo', description: 'bar' };
  const { title, description } = createNotification(input);
  const actual = { title, description };
  expect(actual).toStrictEqual(expected);
});

it('should provide a notification with the current date and time', () => {
  jest.spyOn(Date, 'now').mockReturnValue(123);
  const expected = 123;
  const { date: actual } = createNotification({ title: '', description: '' });
  expect(actual).toBe(expected);
});

afterAll(() => {
  (generateId as jest.Mock).mockRestore();
});
