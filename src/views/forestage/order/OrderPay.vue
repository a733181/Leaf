<template>
  <div>
    <div class="container px-4 mx-auto pt-[130px] lg:pt-[112px]">
      <BaseBreadcrumb name="購物車" class="mb-3" />
      <Breadcrumb mode="pay" />
      <h2 class="mb-3 text-2xl font-bold">您選購的商品</h2>
      <CartProductList :products="cartData" order />
      <h3 class="mb-3 text-2xl font-bold">收件資訊</h3>
      <ReceiptInformation :order="order" />
      <div class="max-w-[500px] ml-auto">
        <BaseBtn class="w-full" @click="payOrder">立即付款</BaseBtn>
      </div>
    </div>
    <BaseDialog :show="isPay" title="您的訂單：" @close="closeIsPay">
      <div class="min-w-min">
        <p>
          您的訂單編號是：<span class="block font-bold lg:inline w-[200px]">{{ orderId }}</span>
        </p>
        <p>請務必記下訂單編號。 <span class="block lg:inline"> ( 可用於查詢訂單狀態 ) </span></p>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
import CartProductList from '@/components/forestage/cart/CartProductList.vue';
import ReceiptInformation from '@/components/forestage/order/ReceiptInformation.vue';
import Breadcrumb from '@/components/forestage/cart/Breadcrumb.vue';

export default {
  components: { CartProductList, Breadcrumb, ReceiptInformation },
  data() {
    return {
      cartData: [],
      order: {},
      orderId: '',
      isPay: false,
    };
  },
  methods: {
    async orderInformation() {
      this.orderId = this.$store.getters['forestageOrder/orderId'];
      if (this.orderId === '') {
        this.$router.replace('/cart');
      }
      await this.$store.dispatch('forestageOrder/getOrder', this.orderId);
      this.order = this.$store.getters['forestageOrder/order'];
      this.cartData = Object.entries(this.order.products).map((item) => item[1]);
    },
    async payOrder() {
      await this.$store.dispatch('forestageOrder/payOrder');
      this.isPay = !this.isPay;
    },
    closeIsPay() {
      this.$router.replace('/order');
      this.isPay = !this.isPay;
    },
  },
  mounted() {
    this.orderInformation();
  },
};
</script>
