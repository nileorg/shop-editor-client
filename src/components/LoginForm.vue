<template>
  <form v-on:submit="onSubmit">
    <div class="form-group">
      <label for="loginFormUsername">Username</label>
      <input
        type="text"
        class="form-control"
        id="loginFormUsername"
        required
        v-model="username"
      />
    </div>
    <div class="form-group">
      <label for="loginFormVerificationCode">Verification Code</label>
      <input
        type="password"
        class="form-control"
        id="loginFormVerificationCode"
        required
        v-model="verificationCode"
      />
    </div>
    <button type="submit" class="btn btn-primary">Log in</button>
  </form>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/types';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginForm',
  data: () => ({
    username: '',
    verificationCode: '',
  }),
  methods: {
    onSubmit(event: Event) {
      event.preventDefault();
      const { username, verificationCode } = this;
      const credentials = { username, verificationCode };
      this.$store.dispatch(ActionTypes.LOGIN, credentials);
    },
  },
});
</script>
