<template>
  <div class="row">
    <div class="col">
      <div
        v-for="notification in notifications"
        v-bind:key="notification.id"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <h4 class="alert-heading">{{ notification.title }}</h4>
        <p>{{ notification.description }}</p>
        <button v-on:click="dismiss(notification.id)" type="button" class="close">
          <span>&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MutationTypes } from '@/store/types';

export default defineComponent({
  name: 'Notifications',
  computed: {
    notifications() {
      return this.$store.state.notifications.notifications;
    },
  },
  methods: {
    dismiss(id: string) {
      this.$store.commit(MutationTypes.REMOVE_NOTIFICATION, id);
    },
  },
});
</script>
