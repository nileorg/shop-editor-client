import {
  GetterTypes,
  MutationTypes,
  Notification,
  NotificationState,
} from './types';

export default {
  state: (): NotificationState => ({
    loadingCount: 0,
    notifications: [],
  }),
  mutations: {
    [MutationTypes.INCREMENT_LOADING_COUNT]: (state: NotificationState): void => {
      state.loadingCount += 1;
    },
    [MutationTypes.DECREMENT_LOADING_COUNT]: (state: NotificationState): void => {
      state.loadingCount -= 1;
    },
    [MutationTypes.RECEIVE_NOTIFICATION]: (
      (state: NotificationState, notification: Notification): void => {
        state.notifications = [
          ...state.notifications,
          notification,
        ];
      }
    ),
    [MutationTypes.REMOVE_NOTIFICATION]: (state: NotificationState, id: string): void => {
      const index = state.notifications.findIndex((notification) => notification.id === id);
      if (index >= 0) {
        state.notifications = [
          ...state.notifications.slice(0, index),
          ...state.notifications.slice(index + 1),
        ];
      }
    },
  },
  getters: {
    [GetterTypes.LOADING]: (state: NotificationState): boolean => Boolean(state.loadingCount),
  },
};
