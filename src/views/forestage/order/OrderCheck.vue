<template>
  <div class="container px-4 mx-auto pt-[112px]">
    <breadcrumb mode="check"></breadcrumb>
    <cart-product-list :products="cartData" order></cart-product-list>
    <ul class="p-4 mt-3 mb-5 bg-gray-100 rounded-lg">
      <li class="flex mb-2">
        <p class="mr-2 text-lg ml-9">姓名：</p>
        <p>{{ order.name }}</p>
      </li>
      <li class="flex mb-2">
        <p class="mr-2 text-lg ml-9">電話：</p>
        <p>{{ order.phone }}</p>
      </li>
      <li class="flex mb-2">
        <p class="mr-2 text-lg">電子信箱：</p>
        <p>{{ order.email }}</p>
      </li>
      <li class="flex mb-2">
        <p class="mr-2 text-lg ml-9">地址：</p>
        <p>{{ order.address }}</p>
      </li>
      <li class="flex mb-2">
        <p class="mr-2 text-lg ml-9">留言：</p>
        <p>{{ order.message }}</p>
      </li>
    </ul>

    <div class="max-w-[500px] ml-auto flex gap-4">
      <router-link to="/orderinformation">
        <base-btn outline class="flex-1">上一步</base-btn>
      </router-link>
      <base-btn class="flex-1" @click="sendOrder">送出</base-btn>
    </div>
  </div>
  <base-loading :show="isLoading"></base-loading>
  <base-dialog :show="!!error" title="Error" @close="closeError">{{ error }}</base-dialog>
  <base-dialog :show="!!orderId" title="已建立訂單" @close="closeOrderId">
    <p>您的訂單編號是：{{ orderId }}</p>
    <p>請務必記下訂單編號。( 可用於查詢訂單狀態 )</p>
  </base-dialog>
</template>

<script>
import CartProductList from '../../../components/forestage/cart/CartProductList.vue';
import Breadcrumb from '../../../components/forestage/cart/Breadcrumb.vue';

export default {
  components: { CartProductList, Breadcrumb },
  data() {
    return {
      order: {},
      error: null,
      isLoading: false,
      orderId: '',
    };
  },
  computed: {
    cartData() {
      return this.$store.getters['forestageCart/cartData'];
    },
  },
  methods: {
    orderInformation() {
      this.order = this.$store.getters['forestageOrder/orderInformation'] ?? {};
      if (this.order?.name === undefined || this.cartData.length === 0) {
        this.$router.replace('/cart');
      }
    },
    async sendOrder() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('forestageOrder/sendOrder');
        this.orderId = this.$store.getters['forestageOrder/orderId'];
        this.$store.dispatch('forestageOrder/orderInformation', '');
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    closeError() {
      this.error = null;
    },
    closeOrderId() {
      this.orderId = '';
      this.$router.replace('/order');
    },
  },
  mounted() {
    this.orderInformation();
  },
};
</script>
