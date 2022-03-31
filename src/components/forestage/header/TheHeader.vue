<template>
  <header class="bg-[#40916C] w-full fixed z-10">
    <nav class="container flex flex-col items-center justify-between px-4 py-4 mx-auto lg:flex-row">
      <RouterLink class="flex items-center hover:opacity-60" to="/">
        <img src="@/assets/svg/leaf.png" alt="Leaf" class="mr-3 w-[30px] h-[30px]" />
        <h1 class="text-4xl text-white font-Redressed">Leaf</h1>
      </RouterLink>
      <ul class="flex gap-8 mt-3 lg:mt-0">
        <li>
          <RouterLink to="about">
            <img src="@/assets/svg/address-card-solid.svg" alt="about" class="icon" />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/question">
            <img src="@/assets/svg/question-solid.svg" alt="常見問題" class="icon" />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/order">
            <img src="@/assets/svg/scroll-solid.svg" alt="訂單查詢" class="icon" />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/products">
            <img src="@/assets/svg/shop.png" alt="商店" class="icon" />
          </RouterLink>
        </li>
        <li class="relative">
          <RouterLink to="/cart">
            <img src="@/assets/svg/cart.png" alt="購物車" class="icon" />
            <span v-if="cartItem" class="text-white bg-red-400 top">{{ cartItem }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <BaseLoading />
  <BaseDialog />
</template>

<script>
export default {
  computed: {
    cartItem() {
      const data = this.$store.getters['forestageCart/cartData'];
      return data.length;
    },
  },
  methods: {
    async getProducts() {
      await this.$store.dispatch('forestageProducts/getProducts');
      this.$store.dispatch('loading/isLoading', false);
    },
    async getCartData() {
      await this.$store.dispatch('forestageCart/getCart');
      this.$store.dispatch('loading/isLoading', false);
    },
  },
  mounted() {
    this.$store.dispatch('loading/isLoading', true);
    this.getProducts();
    this.getCartData();
  },
};
</script>

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Redressed&family=Shizuru&display=swap');
.font-Redressed {
  font-family: Redressed;
}

.icon {
  @apply w-[25px] h-[25px] hover:opacity-60;
}
.top {
  @apply rounded-[50%] text-xs top-0 absolute left-full  -translate-x-1/2 -translate-y-1/2 px-1;
}
</style>
