import { GetterTypes, MutationTypes, NotificationState } from './types';

export default {
  state: () => ({
    loadingCount: 0,
  }),
  mutations: {
    [MutationTypes.INCREMENT_LOADING_COUNT]: (state: NotificationState) => ({
      ...state,
      loadingCount: state.loadingCount + 1,
    }),
    [MutationTypes.DECREMENT_LOADING_COUNT]: (state: NotificationState) => ({
      ...state,
      loadingCount: state.loadingCount - 1,
    }),
  },
  getters: {
    [GetterTypes.LOADING]: (state: NotificationState) => (state.loadingCount > 0),
  },
};
