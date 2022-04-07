<template>
  <header class="bg-[#40916C] w-full fixed z-10">
    <nav class="container flex flex-col items-center justify-between px-4 py-4 mx-auto lg:flex-row">
      <RouterLink class="flex items-center hover:opacity-60" to="/">
        <img src="@/assets/svg/leaf.png" alt="Leaf" class="mr-3 w-[30px] h-[30px]" />
        <h1 class="text-4xl text-white font-Redressed">Leaf</h1>
      </RouterLink>
      <ul class="flex gap-8 mt-3 lg:mt-0">
        <li v-for="nav in navList" :key="nav.name">
          <RouterLink :to="nav.path">
            <img
              :src="require(`@/assets/svg/${nav.imgSrc}`)"
              :alt="nav.name"
              class="icon"
              :class="{ 'opacity-60': nav.path === activePath }"
            />
          </RouterLink>
        </li>
        <li class="relative">
          <RouterLink to="/cart">
            <img
              src="@/assets/svg/cart.png"
              alt="購物車"
              class="icon"
              :class="{ 'opacity-60': '/cart' === activePath }"
            />
            <span v-if="cartItem" class="text-white bg-red-400 top">
              {{ cartItem }}
            </span>
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
  data() {
    return {
      navList: [
        {
          name: '關於Leaf',
          path: '/about',
          imgSrc: 'address-card-solid.svg',
        },
        {
          name: '常見問題',
          path: '/question',
          imgSrc: 'question-solid.svg',
        },
        {
          name: '訂單查詢',
          path: '/order',
          imgSrc: 'scroll-solid.svg',
        },
        {
          name: '商店',
          path: '/products',
          imgSrc: 'shop.png',
        },
      ],
      activePath: '',
    };
  },
  computed: {
    cartItem() {
      const data = this.$store.getters['forestageCart/cartData'];
      return data.length;
    },
  },
  watch: {
    '$route.path': function () {
      this.activePath = this.$route.path;
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
    this.activePath = this.$route.path;
  },
};
</script>

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Redressed&family=Shizuru&display=swap');
.font-Redressed {
  font-family: Redressed;
}

.icon {
  @apply w-[25px] h-[25px] hover:-translate-y-1;
}
.icon-active {
  @apply opacity-60;
}
.top {
  @apply rounded-[50%] text-xs top-0 absolute left-full  -translate-x-1/2 -translate-y-1/2 px-1;
}
</style>
