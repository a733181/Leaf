<template>
  <div class="container px-4 mx-auto pt-[130px] lg:pt-[112px]">
    <BaseBreadcrumb name="購物車" class="mb-3" />
    <Breadcrumb mode="check" />
    <h2 class="mb-3 text-2xl font-bold">您選購的商品</h2>
    <CartProductList :products="cartData" order />
    <h3 class="mb-3 text-2xl font-bold">收件資訊</h3>
    <ReceiptInformation :order="order" />
    <div class="max-w-[500px] ml-auto">
      <div class="flex gap-4" v-if="!order.id">
        <RouterLink to="/orderinformation">
          <BaseBtn outline class="flex-1">上一步</BaseBtn>
        </RouterLink>
        <BaseBtn class="flex-1" @click="sendOrder">送出</BaseBtn>
      </div>
      <BaseBtn class="w-full" @click="payOrder" v-if="order.id">立即付款</BaseBtn>
    </div>
  </div>
  <BaseDialog :show="isPay" title="您的訂單：" @close="closeIsPay">
    <div class="min-w-min">
      <p>
        您的訂單編號是：<span class="block font-bold lg:inline w-[200px]">{{ order.id }}</span>
      </p>
      <p>請務必記下訂單編號。 <span class="block lg:inline"> ( 可用於查詢訂單狀態 ) </span></p>
    </div>
  </BaseDialog>
</template>

<script>
import CartProductList from '@/components/forestage/cart/CartProductList.vue';
import ReceiptInformation from '@/components/forestage/order/ReceiptInformation.vue';
import Breadcrumb from '@/components/forestage/cart/Breadcrumb.vue';

export default {
  components: { CartProductList, Breadcrumb, ReceiptInformation },
  data() {
    return {
      order: {},
      orderId: '',
      isPay: false,
    };
  },
  computed: {
    cartData() {
      return this.$store.getters['forestageCart/cartData'];
    },
  },
  methods: {
    orderInformation() {
      this.order = this.$store.getters['forestageOrder/orderInformation'];
      if (this.order?.user?.name === undefined || this.cartData.length === 0) {
        this.$router.replace('/cart');
      }
    },
    async sendOrder() {
      await this.$store.dispatch('forestageOrder/sendOrder');
      this.order.id = this.$store.getters['forestageOrder/orderId'];
    },
    async getCartData() {
      await this.$store.dispatch('forestageCart/getCart');
    },
    async payOrder() {
      await this.$store.dispatch('forestageOrder/payOrder');
      this.isPay = !this.isPay;
    },
    closeIsPay() {
      this.$router.replace('/order');
      this.isPay = !this.isPay;
      this.getCartData();
      this.$store.dispatch('forestageOrder/orderInformation', '');
    },
  },
  mounted() {
    this.orderInformation();
  },
};
</script>
