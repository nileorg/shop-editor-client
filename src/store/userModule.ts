import { ActionContext } from 'vuex';
import login from '@/api/login';
import {
  ActionTypes,
  Credentials,
  MutationTypes,
  RootState,
  User,
  UserState,
} from './types';

export default {
  state: () => ({
    authenticationToken: '',
  }),
  mutations: {
    [MutationTypes.RECEIVE_USER]: (
      (state: UserState, user: User) => ({
        ...state,
        ...user,
      })
    ),
  },
  actions: {
    [ActionTypes.LOGIN]: (
      async (context: ActionContext<UserState, RootState>, credentials: Credentials) => {
        const { username, verificationCode } = credentials;
        const authenticationToken = await login(username, verificationCode);
        const user = { username, authenticationToken };
        context.commit(MutationTypes.RECEIVE_USER, user);
      }
    ),
  },
};
