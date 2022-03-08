<template>
  <header class="bg-[#40916C] w-full">
    <nav class="container flex items-center justify-between px-4 py-4 mx-auto">
      <router-link class="flex items-center hover:opacity-60" to="/">
        <img src="@/assets/leaf.png" alt="Leaf" class="mr-3 w-[30px] h-[30px]" />
        <h1 class="text-4xl text-white font-Redressed">Leaf</h1>
      </router-link>
      <ul class="flex gap-8">
        <li>
          <router-link to="/admin/order">
            <img src="@/assets/scroll-solid.svg" alt="order" class="icon" />
          </router-link>
        </li>
        <li>
          <router-link to="/admin/products">
            <img src="@/assets/dolly-solid.svg" alt="products" class="icon" />
          </router-link>
        </li>
        <li>
          <router-link to="/admin/coupon">
            <img src="@/assets/c.svg" alt="coupon" class="icon" />
          </router-link>
        </li>
        <li @click="logout">
          <img src="@/assets/sign-out-alt-solid.svg" alt="logout" class="icon" />
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  methods: {
    async logout() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('backstageAuth/logout');
        this.$router.replace('/');
      } catch (err) {
        this.err = err;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Redressed&family=Shizuru&display=swap');
.font-Redressed {
  font-family: Redressed, sans-serif;
}

.icon {
  @apply w-[25px] h-[25px] hover:opacity-60;
}
.top {
  @apply rounded-[50%] text-xs top-0 absolute left-full  -translate-x-1/2 -translate-y-1/2 px-1;
}
</style>
