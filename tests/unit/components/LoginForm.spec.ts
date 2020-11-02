import { mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import { ActionTypes } from '@/store/types';

it('should receive user credentials', async () => {
  const wrapper = mount(LoginForm);
  await wrapper.find('#loginFormUsername').setValue('foo');
  await wrapper.find('#loginFormVerificationCode').setValue('bar');
  expect(wrapper.vm.username).toBe('foo');
  expect(wrapper.vm.verificationCode).toBe('bar');
});

it('should login the user when the form is submitted', async () => {
  const dispatch = jest.fn();
  const wrapper = mount(LoginForm, { global: { mocks: { $store: { dispatch } } } });
  await wrapper.find('#loginFormUsername').setValue('foo');
  await wrapper.find('#loginFormVerificationCode').setValue('bar');
  await wrapper.find('form').trigger('submit');
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith(
    ActionTypes.LOGIN,
    { username: 'foo', verificationCode: 'bar' },
  );
});
