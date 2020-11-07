<template>
  <div>
    <div v-if="products.length" class="row row-cols-4">
      <div class="col mb-4">
        <div
          v-for="product in products"
          v-bind:key="product.name"
          class="card"
        >
          <img
            v-bind:src="product.image"
            class="img-fluid card-img-top"
            v-bind:alt="product.name"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <p v-else>
      <em>You have no products yet.</em>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ActionTypes } from '@/store/types';

export default defineComponent({
  name: 'Product',
  mounted() {
    this.$store.dispatch(ActionTypes.GET_PRODUCTS);
  },
  computed: {
    products() {
      return this.$store.state.shop.products;
    },
  },
});
</script>
