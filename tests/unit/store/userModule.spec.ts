import { ActionContext } from 'vuex';
import userModule from '@/store/userModule';
import {
  ActionTypes, MutationTypes, RootState, UserState,
} from '@/store/types';
import login from '@/api/login';

jest.mock('@/api/login');

const { actions, mutations } = userModule;

it('should receive the user', () => {
  const receiveAuthenticationToken = mutations[MutationTypes.RECEIVE_USER];
  const initialState = { username: '', authenticationToken: '' };
  const user = { username: 'foo', authenticationToken: 'bar' };
  const expected = { username: 'foo', authenticationToken: 'bar' };
  const actual = receiveAuthenticationToken(initialState, user);
  expect(actual).toStrictEqual(expected);
});

it('should log in the user', async () => {
  const username = 'foo';
  const verificationCode = 'bar';
  (login as jest.Mock).mockResolvedValueOnce('baz');
  const commit = jest.fn();

  const loginAction = actions[ActionTypes.LOGIN];
  await loginAction(
    { commit } as unknown as ActionContext<UserState, RootState>,
    { username, verificationCode },
  );

  expect(commit).toHaveBeenCalledWith(
    MutationTypes.RECEIVE_USER,
    { username: 'foo', authenticationToken: 'baz' },
  );
});

afterEach(() => {
  (login as jest.Mock).mockReset();
});

afterAll(() => {
  (login as jest.Mock).mockRestore();
});
