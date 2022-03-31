<template>
  <nav>
    <ul class="flex gap-6">
      <li>
        <RouterLink to="/">首頁</RouterLink>
      </li>
      <li class="breadcrumb-item">
        <RouterLink to="/products" @click="clickStore">商店</RouterLink>
      </li>
      <li class="cursor-pointer breadcrumb-item" @click="clickCategory">{{ category }}</li>
      <li v-if="title" class="breadcrumb-item">{{ title }}</li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  methods: {
    clickStore() {
      this.$store.dispatch('forestageProducts/getFilterProductCategory', '全部商品');
    },
    clickCategory() {
      this.$router.push('/products');
      this.$store.dispatch('forestageProducts/getFilterProductCategory', this.category);
    },
  },
};
</script>

<style scoped>
.breadcrumb-item {
  position: relative;
}
.breadcrumb-item:before {
  content: '';
  background-image: url('../../../assets/svg/arrow.svg');
  background-repeat: no-repeat;
  background-position: center center;
  width: 20px;
  height: 20px;
  position: absolute;
  left: -22px;
  top: 3px;
  transform: rotate(180deg);
}
</style>
