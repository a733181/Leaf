<template>
  <ul>
    <li
      v-for="category in categoryList"
      :key="category"
      class="mb-1 hover:text-[#B7E4C7] active:text-yellow-900 cursor-pointer"
      :class="{ 'text-[#40916C]': activeCategory === category.category }"
      @click="filterProduct(category.category)"
    >
      <div class="flex text-xl">
        <p class="mr-2">( {{ category.quantity }} )</p>
        <p>{{ category.category }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    categoryList() {
      return this.$store.getters['forestageProducts/productCategory'];
    },
    activeCategory() {
      return this.$store.getters['forestageProducts/filterProductCategory'];
    },
  },
  methods: {
    filterProduct(category) {
      this.$store.dispatch('forestageProducts/getFilterProductCategory', category);
    },
  },
};
</script>
