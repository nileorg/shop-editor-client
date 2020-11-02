import { ActionContext } from 'vuex';
import userModule from '@/store/userModule';
import {
  ActionTypes, MutationTypes, RootState, UserState,
} from '@/store/types';
import login from '@/api/login';

jest.mock('@/api/login');

const { actions, mutations } = userModule;

it('should receive authentication token', () => {
  const receiveAuthenticationToken = mutations[MutationTypes.RECEIVE_AUTHENTICATION_TOKEN];
  const initialState = { authenticationToken: '' };
  const authenticationToken = 'foo';
  const expected = { authenticationToken: 'foo' };
  const actual = receiveAuthenticationToken(initialState, authenticationToken);
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

  expect(commit).toHaveBeenCalledWith(MutationTypes.RECEIVE_AUTHENTICATION_TOKEN, 'baz');
});

afterAll(() => {
  (login as jest.Mock).mockRestore();
});
