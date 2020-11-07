export type UserState = {
  username: string;
  authenticationToken: string;
};

export type NotificationState = {
  loadingCount: number;
  notifications: Notification[];
};

export type ShopState = {
  products: Product[];
};

export type RootState = {
  notifications: NotificationState;
  user: UserState;
};

export enum MutationTypes {
  RECEIVE_USER = 'RECEIVE_USER_MUTATION',
  INCREMENT_LOADING_COUNT = 'INCREMENT_LOADING_COUNT_MUTATION',
  DECREMENT_LOADING_COUNT = 'DECREMENT_LOADING_COUNT_MUTATION',
  RECEIVE_NOTIFICATION = 'RECEIVE_NOTIFICATION_MUTATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION_MUTATION',
  RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS_MUTATION',
  CLEAR_PRODUCTS = 'CLEAR_PRODUCTS_MUTATION',
}

export enum ActionTypes {
  LOGIN = 'LOGIN_ACTION',
  GET_PRODUCTS = 'GET_PRODUCTS_ACTION',
}

export enum GetterTypes {
  LOADING = 'LOADING_GETTER',
}

export type Credentials = {
  username: string;
  verificationCode: string;
};

export type User = {
  username: string;
  authenticationToken: string;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  date: number;
};

export type Product = {
  name: string;
  image: string;
  description: string;
  price: number;
  tags: string[];
};
