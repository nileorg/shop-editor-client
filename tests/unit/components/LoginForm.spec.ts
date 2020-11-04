import { mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import { ActionTypes, GetterTypes } from '@/store/types';

const createStore = ({ dispatch, loading }: { dispatch: Function; loading: boolean }) => ({
  dispatch,
  getters: {
    [GetterTypes.LOADING]: loading,
  },
});

it('should receive user credentials', async () => {
  const $store = createStore({ dispatch: jest.fn(), loading: false });
  const wrapper = mount(LoginForm, { global: { mocks: { $store } } });
  await wrapper.find('#loginFormUsername').setValue('foo');
  await wrapper.find('#loginFormVerificationCode').setValue('bar');
  expect(wrapper.vm.username).toBe('foo');
  expect(wrapper.vm.verificationCode).toBe('bar');
});

it('should login the user when the form is submitted', async () => {
  const dispatch = jest.fn();
  const $store = createStore({ dispatch, loading: false });
  const wrapper = mount(LoginForm, { global: { mocks: { $store } } });
  await wrapper.find('#loginFormUsername').setValue('foo');
  await wrapper.find('#loginFormVerificationCode').setValue('bar');
  await wrapper.find('form').trigger('submit');
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith(
    ActionTypes.LOGIN,
    { username: 'foo', verificationCode: 'bar' },
  );
});

it('should disable the submit button when loading', async () => {
  const $store = createStore({ dispatch: jest.fn(), loading: true });
  const wrapper = mount(LoginForm, { global: { mocks: { $store } } });
  const expected = '';
  const actual = wrapper.find('button').attributes('disabled');
  await wrapper.find('#loginFormVerificationCode').setValue('bar');
  expect(actual).toBe(expected);
});
