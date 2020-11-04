import { ActionContext } from 'vuex';
import userModule from '@/store/userModule';
import {
  ActionTypes, MutationTypes, RootState, UserState,
} from '@/store/types';
import login from '@/api/login';

jest.mock('@/api/login');

const { actions, mutations } = userModule;

it('should receive the user', () => {
  const receiveUserMutation = mutations[MutationTypes.RECEIVE_USER];
  const state = { username: '', authenticationToken: '' };
  const user = { username: 'foo', authenticationToken: 'bar' };
  const expected = { username: 'foo', authenticationToken: 'bar' };
  receiveUserMutation(state, user);
  const actual = state;
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

  expect(commit).toHaveBeenCalledTimes(3);
  expect(commit).toHaveBeenNthCalledWith(1, MutationTypes.INCREMENT_LOADING_COUNT);
  expect(commit).toHaveBeenNthCalledWith(
    2,
    MutationTypes.RECEIVE_USER,
    { username: 'foo', authenticationToken: 'baz' },
  );
  expect(commit).toHaveBeenNthCalledWith(3, MutationTypes.DECREMENT_LOADING_COUNT);
});

afterEach(() => {
  (login as jest.Mock).mockReset();
});

afterAll(() => {
  (login as jest.Mock).mockRestore();
});
