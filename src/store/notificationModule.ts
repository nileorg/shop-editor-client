import {
  GetterTypes, MutationTypes, Notification, NotificationState,
} from './types';

export default {
  state: () => ({
    loadingCount: 0,
    notifications: [],
  }),
  mutations: {
    [MutationTypes.INCREMENT_LOADING_COUNT]: (state: NotificationState) => {
      state.loadingCount += 1;
    },
    [MutationTypes.DECREMENT_LOADING_COUNT]: (state: NotificationState) => {
      state.loadingCount -= 1;
    },
    [MutationTypes.RECEIVE_NOTIFICATION]: (
      (state: NotificationState, notification: Notification) => {
        state.notifications = [
          ...state.notifications,
          notification,
        ];
      }
    ),
    [MutationTypes.REMOVE_NOTIFICATION]: (state: NotificationState, id: string) => {
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
    [GetterTypes.LOADING]: (state: NotificationState) => Boolean(state.loadingCount),
  },
};
