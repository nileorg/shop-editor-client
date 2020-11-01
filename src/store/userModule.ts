import { ActionContext } from 'vuex';
import login from '@/api/login';
import { RootState, UserState } from './types';

export enum MutationTypes {
  RECEIVE_AUTHENTICATION_TOKEN = 'RECEIVE_AUTHENTICATION_TOKEN_MUTATION',
}

export enum ActionTypes {
  LOGIN = 'LOGIN_ACTION',
}

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
