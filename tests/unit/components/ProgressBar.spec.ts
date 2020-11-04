import { mount } from '@vue/test-utils';
import ProgressBar from '@/components/ProgressBar.vue';
import { GetterTypes } from '@/store/types';

const createStore = ({ loading }: { loading: boolean }) => ({
  getters: {
    [GetterTypes.LOADING]: loading,
  },
});

it('should show the progress bar when loading', () => {
  const $store = createStore({ loading: true });
  const wrapper = mount(ProgressBar, { global: { mocks: { $store } } });
  const element = wrapper.find('div.progress');
  expect(element.exists()).toBe(true);
});

it('should hide the progress bar when not loading', () => {
  const $store = createStore({ loading: false });
  const wrapper = mount(ProgressBar, { global: { mocks: { $store } } });
  const element = wrapper.find('div.progress');
  expect(element.exists()).toBe(false);
});
