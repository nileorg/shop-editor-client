import { createStore } from 'vuex';
import { isProduction } from '@/utils/environment';
import notificationModule from './notificationModule';
import userModule from './userModule';
import shopModule from './shopModule';

export default createStore({
  modules: {
    notifications: notificationModule,
    user: userModule,
    shop: shopModule,
  },
  strict: !isProduction(),
});
