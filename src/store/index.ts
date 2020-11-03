import { createStore } from 'vuex';
import notificationModule from './notificationModule';
import userModule from './userModule';

export default createStore({
  modules: {
    notifications: notificationModule,
    user: userModule,
  },
  strict: process.env.NODE_ENV !== 'production',
});
