export type UserState = {
  authenticationToken: string;
};

export type RootState = {
  user: UserState;
};

export enum MutationTypes {
  RECEIVE_AUTHENTICATION_TOKEN = 'RECEIVE_AUTHENTICATION_TOKEN_MUTATION',
}

export enum ActionTypes {
  LOGIN = 'LOGIN_ACTION',
}
