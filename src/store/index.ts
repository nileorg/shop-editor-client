import { createStore } from 'vuex';
import { isProduction } from '@/utils/environment';
import notificationModule from './notificationModule';
import userModule from './userModule';

export default createStore({
  modules: {
    notifications: notificationModule,
    user: userModule,
  },
  strict: !isProduction(),
});
