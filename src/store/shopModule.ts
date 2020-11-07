import getShop from '@/api/getShop';
import { logError } from '@/utils/logger';
import { ActionContext } from 'vuex';
import createNotification from './createNotification';
import {
  ActionTypes,
  MutationTypes,
  Product,
  RootState,
  ShopState,
} from './types';

export default {
  state: {
    products: [],
  },
  mutations: {
    [MutationTypes.RECEIVE_PRODUCTS]: (state: ShopState, products: Product[]) => {
      state.products = products;
    },
    [MutationTypes.CLEAR_PRODUCTS]: (state: ShopState) => {
      state.products = [];
    },
  },
  actions: {
    [ActionTypes.GET_PRODUCTS]: async (context: ActionContext<ShopState, RootState>) => {
      context.commit(MutationTypes.INCREMENT_LOADING_COUNT);
      try {
        const { authenticationToken } = context.rootState.user;
        const products = await getShop(authenticationToken);
        context.commit(MutationTypes.CLEAR_PRODUCTS);
        context.commit(MutationTypes.RECEIVE_PRODUCTS, products);
      } catch (error) {
        logError(error);
        const notification = createNotification({
          title: 'Unable to fetch products',
          description: (
            `There was an error while retrieving the products of your shop.
            Refresh the page or contact us if the error persist.`
          ),
        });
        context.commit(MutationTypes.RECEIVE_NOTIFICATION, notification);
      } finally {
        context.commit(MutationTypes.DECREMENT_LOADING_COUNT);
      }
    },
  },
};
