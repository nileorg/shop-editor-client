<template>
  <login-form />
</template>

<script>
import { defineComponent } from 'vue';
import LoginForm from '@/components/LoginForm.vue';

export default defineComponent({
  name: 'Login',
  components: {
    LoginForm,
  },
});
</script>
