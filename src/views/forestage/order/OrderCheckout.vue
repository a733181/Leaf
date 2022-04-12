<template>
  <div class="container px-4 mx-auto pt-[130px] lg:pt-[112px]">
    <BaseBreadcrumb name="購物車" class="mb-3" />
    <Breadcrumb mode="information" />
    <h2 class="mb-3 text-2xl font-bold">您選購的商品</h2>
    <CartProductList :products="cartData" order />
    <div class="max-w-[600px] mx-auto">
      <h3 class="mb-8 text-2xl font-bold">收件資訊</h3>
      <VFrom action="" @submit="onSubmit" v-slot="{ errors }">
        <div class="w-full mb-7">
          <label for="name">收件人姓名<span class="text-red-400">*</span></label>
          <Field
            type="text"
            name="姓名"
            id="name"
            class="w-full px-2 border-b-2"
            :class="{ 'border-red-400': errors['姓名'] }"
            rules="required"
            v-model.trim="order.user.name"
          />
          <ErrorMessage name="姓名" class="text-red-400" />
        </div>
        <div class="w-full mb-7">
          <label for="email">Email<span class="text-red-400">*</span></label>
          <Field
            type="email"
            name="email"
            id="email"
            class="w-full px-2 border-b-2"
            :class="{ 'border-red-400': errors['email'] }"
            rules="required|email"
            v-model.trim="order.user.email"
          />
          <ErrorMessage name="email" class="text-red-400" />
        </div>
        <div class="w-full mb-7">
          <label for="phone">手機號碼<span class="text-red-400">*</span></label>
          <Field
            type="tel"
            name="phone"
            id="phone"
            :rules="phoneNumber"
            class="w-full px-2 border-b-2"
            :class="{ 'border-red-400': errors['phone'] }"
            v-model.trim="order.user.tel"
          />
          <ErrorMessage name="phone" class="text-red-400" />
        </div>

        <div class="w-full mb-7">
          <label for="address">收件地址<span class="text-red-400">*</span></label>
          <Field
            type="text"
            name="地址"
            id="address"
            rules="required|min:8"
            class="w-full px-2 border-b-2"
            :class="{ 'border-red-400': errors['地址'] }"
            v-model.trim="order.user.address"
          />
          <ErrorMessage name="地址" class="text-red-400" />
        </div>
        <div class="mb-10">
          <label for="message">留給賣家的話</label>
          <textarea
            name="留言"
            id="message"
            cols="20"
            rows="2"
            rules="max:30"
            class="w-full px-2 border-b-2"
            v-model.trim="order.message"
          ></textarea>
          <ErrorMessage name="留言" />
        </div>
        <div class="lg:w-1/2 lg:ml-auto">
          <BaseBtn type="submit" class="w-full">下一步</BaseBtn>
        </div>
      </VFrom>
    </div>
  </div>
</template>

<script>
import {
  Form as VFrom, Field, configure, defineRule, ErrorMessage,
} from 'vee-validate';

import { required, email, min } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import Breadcrumb from '@/components/forestage/cart/Breadcrumb.vue';
import CartProductList from '@/components/forestage/cart/CartProductList.vue';

configure({
  generateMessage: localize('zh_TW', zhTW),
});

defineRule('email', email);
defineRule('required', required);
defineRule('min', min);

export default {
  components: {
    VFrom,
    Field,
    ErrorMessage,
    Breadcrumb,
    CartProductList,
  },
  data() {
    return {
      order: {
        user: {
          name: '',
          email: '',
          tel: null,
          address: '',
        },
        message: '',
      },
    };
  },
  computed: {
    cartData() {
      return this.$store.getters['forestageCart/cartData'];
    },
  },
  methods: {
    phoneNumber(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼';
    },
    async onSubmit() {
      const data = {
        ...this.order,
      };
      await this.$store.dispatch('forestageOrder/sendOrder', data);
      this.$router.push('/orderpay');
    },
    orderClear() {
      this.order = {
        user: {
          name: '',
          email: '',
          tel: null,
          address: '',
        },
        message: '',
      };
    },
  },
  unmounted() {
    this.orderClear();
  },
};
</script>
