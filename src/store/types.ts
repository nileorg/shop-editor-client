export type UserState = {
  authenticationToken: string;
};

export type RootState = {
  user: UserState;
};
