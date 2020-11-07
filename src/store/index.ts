import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { isProduction } from '@/utils/environment';
import notificationModule from './notificationModule';
import userModule from './userModule';
import shopModule from './shopModule';
import { RootState } from './types';

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
});

export default createStore({
  modules: {
    notifications: notificationModule,
    user: userModule,
    shop: shopModule,
  },
  plugins: [vuexLocal.plugin],
  strict: !isProduction(),
});
