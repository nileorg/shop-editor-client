export type UserState = {
  username: string;
  authenticationToken: string;
};

export type RootState = {
  user: UserState;
};

export enum MutationTypes {
  RECEIVE_USER = 'RECEIVE_USER_MUTATION',
}

export enum ActionTypes {
  LOGIN = 'LOGIN_ACTION',
}

export type Credentials = {
  username: string;
  verificationCode: string;
};

export type User = {
  username: string;
  authenticationToken: string;
};
