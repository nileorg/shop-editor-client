import { mount } from '@vue/test-utils';
import ProgressBar from '@/components/ProgressBar.vue';
import { GetterTypes } from '@/store/types';

const loadingGetter = jest.fn();
const getters = {
  [GetterTypes.LOADING]: loadingGetter,
};
const $store = { getters };

beforeEach(() => {
  loadingGetter.mockReset();
});

it('should show the progress bar when loading', () => {
  loadingGetter.mockReturnValue(true);
  const wrapper = mount(ProgressBar, { global: { mocks: { $store } } });
  const element = wrapper.find('div.progress');
  expect(element).toBeDefined();
});

it('should hide the progress bar when not loading', () => {
  loadingGetter.mockReturnValue(false);
  const wrapper = mount(ProgressBar, { global: { mocks: { $store } } });
  const element = wrapper.find('div.progress');
  expect(element).toBeUndefined();
});
