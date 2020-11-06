<template>
  <div class="jumbotron">
    <h1 class="display-4">Nile Shop Editor</h1>
    <p class="lead">This is a simple application for editing your Nile shop account.</p>
    <hr class="my-4" />
    <div v-if="username">
      <p>Welcome back, <strong>{{ username }}</strong></p>
    </div>
    <div v-else>
      <p>Please log in or register a new account.</p>
      <router-link class="btn btn-primary btn-lg" to="/login" role="button">Login</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  computed: {
    username() {
      return this.$store.state.user.username;
    },
  },
});
</script>
