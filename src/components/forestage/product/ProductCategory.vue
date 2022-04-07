<template>
  <p class="mb-2 text-sm text-gray-400">(商品數量)商品名稱</p>
  <ul>
    <li
      v-for="category in categoryList"
      :key="category"
      class="mb-2 hover:text-[#40916C] active:text-yellow-900 cursor-pointer touch:text-[#B7E4C7]"
      :class="activeClass(category.category)"
      @click="filterProduct(category.category)"
    >
      <div class="flex px-3 py-2 text-xl border-2 rounded-lg">
        <p class="mr-2">
          ( {{ category.quantity > 10 ? category.quantity : `0${category.quantity}` }} )
        </p>
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
    activeClass(category) {
      if (category === this.activeCategory) {
        return ['bg-gray-100'];
      }
      return '';
    },
  },
};
</script>
