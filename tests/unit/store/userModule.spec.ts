import { ActionContext } from 'vuex';
import userModule from '@/store/userModule';
import {
  ActionTypes, MutationTypes, RootState, UserState,
} from '@/store/types';
import createNotification from '@/store/createNotification';
import login from '@/api/login';
import router from '@/router';

jest.mock('@/api/login');
jest.mock('@/store/createNotification');

const { actions, mutations } = userModule;

beforeEach(() => {
  (login as jest.Mock).mockReset();
  (createNotification as jest.Mock).mockReset();
});

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

it('should redirect the user to the home page when logged in', async () => {
  const username = '';
  const verificationCode = '';
  (login as jest.Mock).mockResolvedValueOnce('');
  const commit = jest.fn();
  const pushSpy = jest.spyOn(router, 'push');

  const loginAction = actions[ActionTypes.LOGIN];
  await loginAction(
    { commit } as unknown as ActionContext<UserState, RootState>,
    { username, verificationCode },
  );

  expect(pushSpy).toHaveBeenCalledTimes(1);
  expect(pushSpy).toHaveBeenCalledWith('/');
});

it('should notify when the login fails', async () => {
  (login as jest.Mock).mockRejectedValue(new Error('foo'));
  (createNotification as jest.Mock).mockImplementation((data) => data);

  const commit = jest.fn();
  const context = { commit } as unknown as ActionContext<UserState, RootState>;
  const credentials = { username: '', verificationCode: '' };

  const loginAction = actions[ActionTypes.LOGIN];
  await loginAction(context, credentials);

  expect(commit).toHaveBeenCalledWith(
    MutationTypes.RECEIVE_NOTIFICATION,
    {
      title: 'Login failed',
      description: 'Please check your credentials.',
    },
  );
});

afterAll(() => {
  (login as jest.Mock).mockRestore();
  (createNotification as jest.Mock).mockRestore();
});
