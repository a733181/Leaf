<template>
  <div class="container px-4 mx-auto pt-[130px] lg:pt-[112px]">
    <BaseBreadcrumb name="購物車" />
    <div v-if="cartData.length !== 0" class="mt-3">
      <Breadcrumb mode="cart" />
      <CartProductList :products="cartData" />
      <div class="mt-10 mb-6 ml-auto xl:w-1/3">
        <UseCoupon class="mb-12" />
        <div class="flex gap-4">
          <RouterLink to="/products">
            <BaseBtn outline>繼續選購</BaseBtn>
          </RouterLink>
          <RouterLink to="/ordercheckout" class="flex-1">
            <BaseBtn class="w-full">下一步</BaseBtn>
          </RouterLink>
        </div>
      </div>
      <ProductMore title="您可能會喜歡" />
    </div>
    <div v-if="cartData.length === 0" class="mt-3">
      <p class="mb-5 text-2xl font-bold text-center">購物車沒有東西~快去選購吧</p>
      <RouterLink to="/products">
        <BaseBtn class="block w-2/3 mx-auto lg:w-1/5" outline>去購物</BaseBtn>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import CartProductList from '@/components/forestage/cart/CartProductList.vue';
import UseCoupon from '@/components/forestage/coupon/UseCoupon.vue';
import Breadcrumb from '@/components/forestage/cart/Breadcrumb.vue';
import ProductMore from '@/components/forestage/product/ProductMore.vue';

export default {
  components: {
    CartProductList,
    UseCoupon,
    Breadcrumb,
    ProductMore,
  },
  computed: {
    cartData() {
      return this.$store.getters['forestageCart/cartData'];
    },
  },
};
</script>
