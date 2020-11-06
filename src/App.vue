<template>
  <ProgressBar />
  <div class="container">
    <div class="row">
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProgressBar from '@/components/ProgressBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    ProgressBar,
  },
});
</script>
