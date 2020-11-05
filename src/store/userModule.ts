import { ActionContext } from 'vuex';
import login from '@/api/login';
import { logError } from '@/utils/logger';
import {
  ActionTypes,
  Credentials,
  MutationTypes,
  RootState,
  User,
  UserState,
} from './types';
import createNotification from './createNotification';

export default {
  state: () => ({
    authenticationToken: '',
  }),
  mutations: {
    [MutationTypes.RECEIVE_USER]: (state: UserState, user: User) => {
      state.username = user.username;
      state.authenticationToken = user.authenticationToken;
    },
  },
  actions: {
    [ActionTypes.LOGIN]: (
      async (context: ActionContext<UserState, RootState>, credentials: Credentials) => {
        context.commit(MutationTypes.INCREMENT_LOADING_COUNT);
        try {
          const { username, verificationCode } = credentials;
          const authenticationToken = await login(username, verificationCode);
          const user = { username, authenticationToken };
          context.commit(MutationTypes.RECEIVE_USER, user);
        } catch (error) {
          logError(error);
          const notification = createNotification({
            title: 'Login failed',
            description: 'Please check your credentials.',
          });
          context.commit(MutationTypes.RECEIVE_NOTIFICATION, notification);
        } finally {
          context.commit(MutationTypes.DECREMENT_LOADING_COUNT);
        }
      }
    ),
  },
};
