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
  props: ['category-list', 'active-category'],
  emits: ['filter-product'],
  methods: {
    filterProduct(category) {
      this.$emit('filter-product', category);
    },
  },
};
</script>
