<template>
  <div class="progress" v-if="active">
    <div
      class="progress-bar progress-bar-striped progress-bar-animated"
      role="progressbar"
      aria-valuenow="100"
      aria-valuemin="0"
      aria-valuemax="100"
      style="width: 100%" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GetterTypes } from '@/store/types';

export default defineComponent({
  name: 'ProgressBar',
  computed: {
    active() {
      return this.$store.getters[GetterTypes.LOADING];
    },
  },
});
</script>
