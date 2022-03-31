<template>
  <div class="container px-4 mx-auto pt-[130px] lg:pt-[112px]">
    <BaseBreadcrumb name="購物車" />
    <div v-if="cartData.length !== 0" class="mt-3">
      <Breadcrumb mode="cart" />
      <CartProductList :products="cartData" />
      <div class="mt-10 ml-auto xl:w-1/3">
        <UseCoupon class="mb-12" />
        <div class="flex gap-4">
          <RouterLink to="/products">
            <BaseBtn outline>繼續選購</BaseBtn>
          </RouterLink>
          <RouterLink to="/orderinformation" class="flex-1">
            <BaseBtn class="w-full">下一步</BaseBtn>
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-if="cartData.length === 0" class="mt-3">
      <p class="mb-5 text-2xl font-bold text-center">購物車沒有東西~快去選購吧</p>
      <RouterLink to="/products">
        <base-btn class="block w-2/3 mx-auto lg:w-1/5" outline>去購物</base-btn>
      </RouterLink>
    </div>
  </div>
</template>
<script>
import CartProductList from '@/components/forestage/cart/CartProductList.vue';
import UseCoupon from '@/components/forestage/coupon/UseCoupon.vue';
import Breadcrumb from '@/components/forestage/cart/Breadcrumb.vue';

export default {
  components: { CartProductList, UseCoupon, Breadcrumb },
  computed: {
    cartData() {
      return this.$store.getters['forestageCart/cartData'];
    },
  },
};
</script>
