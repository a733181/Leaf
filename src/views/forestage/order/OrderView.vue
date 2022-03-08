<template>
  <div class="container px-4 mx-auto pt-[112px]">
    <div class="mb-6">
      <form
        action=""
        class="flex flex-col items-center gap-3 mb-3 lg:flex-row"
        @submit.prevent="searchOrder"
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
        <base-btn class="w-full lg:w-20" submit>搜尋</base-btn>
      </form>
      <router-link to="/products">
        <base-btn class="w-full lg:w-[56.5%] xl:w-[35%] 2xl:w-[32%]" outline>返回商城</base-btn>
      </router-link>
    </div>
    <div v-if="order?.id">
      <h1 class="mb-3 text-2xl font-bold">商品清單</h1>
      <cart-product-list :products="products" order></cart-product-list>

      <h2 class="mb-3 text-2xl font-bold">訂單明細</h2>
      <ul class="mb-8 bg-gray-100 rounded-lg lg:p-6">
        <li class="flex gap-2">
          <h3 class="mb-2 text-lg">訂單編號：</h3>
          <p>{{ order.id }}</p>
        </li>
        <li class="flex gap-2 mb-2">
          <h3 class="text-lg">付款狀態：</h3>
          <p :class="{ 'text-red-600': !order.is_paid }">
            {{ order.is_paid ? '已付款' : '未付款' }}
          </p>
        </li>
        <li class="flex gap-2 mb-2">
          <h3 class="text-lg ml-9">姓名：</h3>
          <p>{{ order.user.name.slice(0, 1).toUpperCase() }}xx</p>
        </li>
        <li class="flex gap-2 mb-2">
          <h3 class="text-lg ml-9">電話：</h3>
          <p>{{ order.user.tel.slice(0, 4) }}xxxx</p>
        </li>
        <li class="flex gap-2 mb-2">
          <h3 class="text-lg">電子信箱：</h3>
          <p>{{ order.user.email.slice(0, 5) }}xxxx</p>
        </li>
        <li class="flex gap-2 mb-2">
          <h3 class="text-lg ml-9">地址：</h3>
          <p>{{ order.user.address.slice(0, 7) }}xxxxxxxx</p>
        </li>
        <li class="flex gap-2 mb-2">
          <h3 class="text-lg ml-9">留言：</h3>
          <p>{{ order.message }}</p>
        </li>
      </ul>
    </div>
    <p class="text-3xl text-center" v-if="!order">搜尋不到訂單，請確認訂單編號是否正確</p>
  </div>
  <base-loading :show="isLoading"></base-loading>
  <base-dialog :show="!!error" title="Error" @close="closeError">{{ error }}</base-dialog>
</template>

<script>
import CartProductList from '../../../components/forestage/cart/CartProductList.vue';

export default {
  components: { CartProductList },
  data() {
    return {
      orderId: {
        value: '',
        isValue: false,
      },
      order: {},
      products: [],
      error: null,
      isLoading: false,
    };
  },
  methods: {
    async searchOrder() {
      try {
        if (this.orderId.value === '') {
          this.orderId.isValue = true;
          return;
        }

        this.isLoading = true;
        await this.$store.dispatch('forestageOrder/getOrder', this.orderId.value);
        this.order = this.$store.getters['forestageOrder/order'];
        console.log(this.order);
        if (this.order === null) {
          this.isLoading = false;
        } else {
          this.products = Object.entries(this.order.products).map((item) => item[1]);
        }
        this.orderId.value = '';
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    closeError() {
      this.error = null;
    },
  },
};
</script>
