import { createStore } from 'vuex';
import userModule from './userModule';

export default createStore({
  modules: {
    user: userModule,
  },
  strict: process.env.NODE_ENV !== 'production',
});
