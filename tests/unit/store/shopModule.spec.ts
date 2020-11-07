import shopModule from '@/store/shopModule';
import getShop from '@/api/getShop';
import {
  ActionTypes,
  MutationTypes,
  RootState,
  ShopState,
} from '@/store/types';
import { ActionContext } from 'vuex';

jest.mock('@/api/getShop');

beforeEach(() => {
  (getShop as jest.Mock).mockReset();
});

const { mutations, actions } = shopModule;
const receiveProductsMutation = mutations[MutationTypes.RECEIVE_PRODUCTS];
const clearProductsMutation = mutations[MutationTypes.CLEAR_PRODUCTS];
const getProductsAction = actions[ActionTypes.GET_PRODUCTS];

const createMockContext = () => {
  const commit = jest.fn();
  return {
    rootState: {
      user: {
        authenticationToken: 'foo',
      },
    },
    commit,
  } as unknown as ActionContext<ShopState, RootState>;
};

describe(MutationTypes.RECEIVE_PRODUCTS, () => {
  it('should receive products', () => {
    const state = {
      products: [],
    };
    const products = [
      {
        name: 'foo',
        image: 'bar',
        description: 'baz',
        price: 123,
        tags: ['biz'],
      },
    ];
    const expected = {
      products: [
        {
          name: 'foo',
          image: 'bar',
          description: 'baz',
          price: 123,
          tags: ['biz'],
        },
      ],
    };
    receiveProductsMutation(state, products);
    const actual = state;
    expect(actual).toStrictEqual(expected);
  });
});

describe(MutationTypes.CLEAR_PRODUCTS, () => {
  it('should clear the stored products', () => {
    const state = {
      products: [
        {
          name: 'foo',
          image: 'bar',
          description: 'baz',
          price: 123,
          tags: ['biz'],
        },
      ],
    };
    const expected = { products: [] };
    clearProductsMutation(state);
    const actual = state;
    expect(actual).toStrictEqual(expected);
  });
});

describe(ActionTypes.GET_PRODUCTS, () => {
  it('should set the loading status', async () => {
    const context = createMockContext();
    const { commit } = context;
    await getProductsAction(context);
    expect(commit).toHaveBeenNthCalledWith(1, MutationTypes.INCREMENT_LOADING_COUNT);
    expect(commit).toHaveBeenNthCalledWith(4, MutationTypes.DECREMENT_LOADING_COUNT);
  });

  it('should retrieve the shop of the current user', async () => {
    await getProductsAction(createMockContext());
    expect(getShop).toHaveBeenCalledTimes(1);
    expect(getShop).toHaveBeenCalledWith('foo');
  });

  it('should clear previously existing products', async () => {
    const context = createMockContext();
    const { commit } = context;
    await getProductsAction(context);
    expect(commit).toHaveBeenNthCalledWith(2, MutationTypes.CLEAR_PRODUCTS);
  });

  it('should store new products', async () => {
    (getShop as jest.Mock).mockResolvedValueOnce([
      {
        name: 'bar',
        image: 'baz',
        description: 'biz',
        price: 123,
        tags: ['buz'],
      },
    ]);

    const context = createMockContext();
    const { commit } = context;
    await getProductsAction(context);
    expect(commit).toHaveBeenNthCalledWith(
      3,
      MutationTypes.RECEIVE_PRODUCTS,
      [
        {
          name: 'bar',
          image: 'baz',
          description: 'biz',
          price: 123,
          tags: ['buz'],
        },
      ],
    );
  });
});

afterAll(() => {
  jest.unmock('@/api/getShop');
});
