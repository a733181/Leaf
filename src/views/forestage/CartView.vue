<template>
  <div class="container px-4 mx-auto pt-[112px]">
    <div v-if="cartData.length !== 0">
      <breadcrumb mode="cart"></breadcrumb>
      <cart-product-list
        :products="cartData"
        @change-product-quantity="changeProductQuantity"
        @delete-product="deleteProduct"
      ></cart-product-list>
      <div class="mt-10 ml-auto lg:w-1/3">
        <use-coupon class="mb-12" @coupon-code="useCoupon"></use-coupon>
        <router-link to="/orderinformation">
          <base-btn class="w-full">下一步</base-btn>
        </router-link>
      </div>
    </div>
    <div v-if="cartData.length === 0">
      <p class="mb-5 text-2xl font-bold text-center">購物車沒有東西~快去選購吧</p>
      <router-link to="/products">
        <base-btn class="block w-1/5 mx-auto" outline>去購物</base-btn>
      </router-link>
    </div>
  </div>
  <base-loading :show="isLoading"></base-loading>
  <base-dialog :show="!!error" title="Error" @close="closeError">{{ error }}</base-dialog>
</template>
<script>
import CartProductList from '../../components/forestage/cart/CartProductList.vue';
import UseCoupon from '../../components/forestage/coupon/UseCoupon.vue';
import Breadcrumb from '../../components/forestage/cart/Breadcrumb.vue';

export default {
  components: { CartProductList, UseCoupon, Breadcrumb },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    cartData() {
      return this.$store.getters['forestageCart/cartData'];
    },
  },
  methods: {
    async getCartData() {
      try {
        await this.$store.dispatch('forestageCart/getCart');
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    closeError() {
      this.error = null;
    },
    async changeProductQuantity(data) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('forestageCart/changeProductQuantity', data);
        this.getCartData();
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteProduct(id) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('forestageCart/deleteProduct', id);
        this.getCartData();
      } catch (err) {
        this.error = err;
        this.isLoading = false;
      }
    },
    async useCoupon(code) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('forestageCoupon/useCoupon', code);
        this.getCartData();
      } catch (err) {
        this.isLoading = false;
        this.error = err;
      }
    },
  },
  mounted() {
    this.getCartData();
    this.isLoading = true;
  },
};
</script>
