<template>
  <header class="bg-[#40916C] w-full fixed z-10">
    <nav class="container flex items-center justify-between px-4 py-4 mx-auto">
      <router-link class="flex items-center hover:opacity-60" to="/">
        <img src="@/assets/leaf.png" alt="Leaf" class="mr-3 w-[30px] h-[30px]" />
        <h1 class="text-4xl text-white font-Redressed">Leaf</h1>
      </router-link>
      <ul class="flex gap-8">
        <li>
          <router-link to="/order">
            <img src="@/assets/scroll-solid.svg" alt="shop" class="icon" />
          </router-link>
        </li>
        <li>
          <router-link to="/products">
            <img src="@/assets/shop.png" alt="shop" class="icon" />
          </router-link>
        </li>
        <li class="relative">
          <router-link to="/cart">
            <img src="@/assets/cart.png" alt="cart" class="icon" />
            <span v-if="cartItem" class="text-white bg-red-400 top">{{ cartItem }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    cartItem() {
      const data = this.$store.getters['forestageCart/cartData'];
      return data.length;
    },
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
