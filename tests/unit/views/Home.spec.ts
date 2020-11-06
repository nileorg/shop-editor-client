import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

it('should display a greeting message when the user is logged in', () => {
  const $store = {
    state: {
      user: {
        username: 'foo',
      },
    },
  };
  const wrapper = mount(
    Home,
    {
      global: {
        mocks: { $store },
        stubs: ['router-link'],
      },
    },
  );

  const expected = 'Welcome back, foo';
  const actual = wrapper.find('div.jumbotron div p').text();

  expect(actual).toBe(expected);
});

it('should display a greeting message when the user is not logged in', () => {
  const $store = {
    state: {
      user: {
        username: '',
      },
    },
  };
  const wrapper = mount(
    Home,
    {
      global: {
        mocks: { $store },
        stubs: ['router-link'],
      },
    },
  );

  const expected = 'Please log in or register a new account.';
  const actual = wrapper.find('div.jumbotron div p').text();

  expect(actual).toBe(expected);
});
