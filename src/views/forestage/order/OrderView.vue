<template>
  <div class="container px-4 mx-auto pt-[130px] lg:pt-[112px]">
    <BaseBreadcrumb name="訂單查詢" />
    <h2 class="mt-3 mb-4 text-2xl font-bold">訂單查詢</h2>
    <div class="mb-10">
      <form
        action=""
        class="flex flex-col items-center gap-3 mb-3 lg:flex-row"
        @submit.prevent="searchOrderFrom"
      >
        <label for="orderId" class="text-2xl font-bold lg:text-lg">請輸入訂單編號</label>
        <input
          type="text"
          name=""
          id="orderId"
          class="p-[7px] border-2 rounded-lg w-full lg:w-1/3 xl:w-1/6"
          :class="{ 'border-red-300': orderId.isValue }"
          @blur="orderId.isValue = false"
          v-model.trim="orderId.value"
        />
        <BaseBtn class="w-full lg:w-20" type="submit">搜尋</BaseBtn>
      </form>
    </div>
    <div v-if="order?.id" class="mb-10">
      <h3 class="mb-3 text-2xl font-bold">商品清單</h3>
      <CartProductList :products="products" order />
      <h3 class="mb-3 text-2xl font-bold">訂單明細</h3>
      <ReceiptInformation :order="order" />
      <BaseBtn class="w-full" @click="payOrder" v-if="!order.is_paid">立即付款</BaseBtn>
    </div>
    <p class="mb-6 text-3xl text-center" v-if="!order">搜尋不到訂單，請確認訂單編號是否正確</p>
  </div>
  <div class="mb-12 bg-gray-100">
    <div class="container flex flex-col items-center justify-center p-4 px-6 mx-auto lg:flex-row">
      <h3 class="mb-2 lg:mr-6 lg:mb-0">
        限時限量優惠代碼，數量有限送完為止，結帳時請自行輸入折扣碼：
        <span class="font-bold">leafGo</span>
      </h3>
      <RouterLink to="/products">
        <BaseBtn class="w-[300px]">快來選購</BaseBtn>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import CartProductList from '@/components/forestage/cart/CartProductList.vue';
import ReceiptInformation from '@/components/forestage/order/ReceiptInformation.vue';

export default {
  components: { CartProductList, ReceiptInformation },
  data() {
    return {
      orderId: {
        value: '',
        isValue: false,
      },
      order: {},
      products: [],
    };
  },
  methods: {
    searchOrderFrom() {
      if (this.orderId.value === '') {
        this.orderId.isValue = true;
        return;
      }
      this.searchOrder();
      this.orderId.value = '';
    },
    async searchOrder() {
      const id = this.orderId.value === '' ? this.order.id : this.orderId.value;
      await this.$store.dispatch('forestageOrder/getOrder', id);
      this.order = this.$store.getters['forestageOrder/order'];

      this.products = Object.entries(this.order.products).map((item) => item[1]);
    },
    async payOrder() {
      await this.$store.dispatch('forestageOrder/payOrder');
      this.searchOrder();
    },
    closeError() {
      this.error = null;
    },
  },
};
</script>
