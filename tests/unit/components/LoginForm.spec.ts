import { mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import { ActionTypes, GetterTypes } from '@/store/types';

const dispatch = jest.fn();

const loadingGetter = jest.fn();
const getters = {
  [GetterTypes.LOADING]: loadingGetter,
};

const $store = { dispatch, getters };

beforeEach(() => {
  dispatch.mockReset();
});

it('should receive user credentials', async () => {
  const wrapper = mount(LoginForm, { global: { mocks: { $store } } });
  await wrapper.find('#loginFormUsername').setValue('foo');
  await wrapper.find('#loginFormVerificationCode').setValue('bar');
  expect(wrapper.vm.username).toBe('foo');
  expect(wrapper.vm.verificationCode).toBe('bar');
});

it('should login the user when the form is submitted', async () => {
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
  loadingGetter.mockReturnValue(true);
  const wrapper = mount(LoginForm, { global: { mocks: { $store } } });
  const expected = '';
  const actual = await wrapper.find('button').attributes('disabled');
  await wrapper.find('#loginFormVerificationCode').setValue('bar');
  expect(actual).toBe(expected);
});
