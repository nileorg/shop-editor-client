import { ActionContext } from 'vuex';
import login from '@/api/login';
import {
  ActionTypes,
  MutationTypes,
  RootState,
  UserState,
} from './types';

type Credentials = {
  username: string;
  verificationCode: string;
};

export default {
  state: () => ({
    authenticationToken: '',
  }),
  mutations: {
    [MutationTypes.RECEIVE_AUTHENTICATION_TOKEN]: (
      (state: UserState, authenticationToken: string) => ({
        ...state,
        authenticationToken,
      })
    ),
  },
  actions: {
    [ActionTypes.LOGIN]: (
      async (context: ActionContext<UserState, RootState>, credentials: Credentials) => {
        const { username, verificationCode } = credentials;
        const authenticationToken = await login(username, verificationCode);
        context.commit(MutationTypes.RECEIVE_AUTHENTICATION_TOKEN, authenticationToken);
      }
    ),
  },
};
