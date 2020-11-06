import { mount } from '@vue/test-utils';
import Notification from '@/components/Notifications.vue';
import { MutationTypes } from '@/store/types';

it('should display a list of notifications', () => {
  const $store = {
    state: {
      notifications: {
        notifications: [
          {
            id: 'foo-1',
            title: 'bar-1',
            description: 'baz-1',
          },
          {
            id: 'foo-2',
            title: 'bar-2',
            description: 'baz-2',
          },
        ],
      },
    },
  };
  const wrapper = mount(Notification, { global: { mocks: { $store } } });

  const expected = 2;
  const { length: actual } = wrapper.findAll('div.alert');

  expect(actual).toBe(expected);
});

it('should dismiss closed notifications', () => {
  const commit = jest.fn();
  const $store = {
    state: {
      notifications: {
        notifications: [
          {
            id: 'foo',
            title: 'bar',
            description: 'baz',
          },
        ],
      },
    },
    commit,
  };
  const wrapper = mount(Notification, { global: { mocks: { $store } } });

  wrapper.find('button.close').trigger('click');
  expect(commit).toHaveBeenCalledWith(MutationTypes.REMOVE_NOTIFICATION, 'foo');
});
