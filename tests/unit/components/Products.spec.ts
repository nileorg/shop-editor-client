import { mount } from '@vue/test-utils';
import Products from '@/components/Products.vue';
import { ActionTypes } from '@/store/types';

it('should retrieve the shop products', () => {
  const dispatch = jest.fn();
  const $store = {
    state: {
      shop: {
        products: [],
      },
    },
    dispatch,
  };
  mount(Products, { global: { mocks: { $store } } });
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith(ActionTypes.GET_PRODUCTS);
});

it('should display a list of products', () => {
  const $store = {
    state: {
      shop: {
        products: [
          {
            name: 'foo-1',
            image: 'bar-1',
            description: 'baz-1',
            price: 123,
            tags: ['biz-1'],
          },
          {
            name: 'foo-2',
            image: 'bar-2',
            description: 'baz-2',
            price: 456,
            tags: ['biz-2'],
          },
        ],
      },
    },
    dispatch: jest.fn(),
  };
  const wrapper = mount(Products, { global: { mocks: { $store } } });
  const elements = wrapper.findAll('div.card');
  expect(elements).toHaveLength(2);
  expect(elements[0].find('img').attributes('src')).toBe('bar-1');
  expect(elements[0].find('h5').text()).toBe('foo-1');
  expect(elements[0].find('p').text()).toBe('baz-1');
  expect(elements[1].find('img').attributes('src')).toBe('bar-2');
  expect(elements[1].find('h5').text()).toBe('foo-2');
  expect(elements[1].find('p').text()).toBe('baz-2');
});

it('should display a message when there are no products', () => {
  const $store = {
    state: {
      shop: {
        products: [],
      },
    },
    dispatch: jest.fn(),
  };
  const wrapper = mount(Products, { global: { mocks: { $store } } });
  expect(wrapper.find('p em').text()).toBe('You have no products yet.');
});
