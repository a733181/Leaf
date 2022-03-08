<template>
  <div class="container px-4 mx-auto pt-[112px]">
    <breadcrumb mode="information"></breadcrumb>
    <div class="mx-auto w-[350px]">
      <v-from action="" @submit="onSubmit" v-slot="{ errors }">
        <div class="mb-9">
          <label for="name">姓名<span class="text-red-400">*</span></label>
          <field
            type="text"
            name="姓名"
            id="name"
            class="w-full px-2 border-b-2"
            :class="{ 'border-red-400': errors['姓名'] }"
            rules="required"
            v-model.trim="order.name"
          />
          <error-message name="姓名" class="border-red-400"></error-message>
        </div>
        <div class="mb-9">
          <label for="phone">手機號碼<span class="text-red-400">*</span></label>
          <field
            type="tel"
            name="phone"
            id="phone"
            :rules="phoneNumber"
            class="w-full px-2 border-b-2"
            :class="{ 'border-red-400': errors['phone'] }"
            v-model.trim="order.phone"
          />
          <error-message name="phone" class="border-red-400"></error-message>
        </div>
        <div class="mb-9">
          <label for="email">Email<span class="text-red-400">*</span></label>
          <field
            type="email"
            name="email"
            id="email"
            class="w-full px-2 border-b-2"
            :class="{ 'border-red-400': errors['email'] }"
            rules="required|email"
            v-model.trim="order.email"
          />
          <error-message name="email" class="border-red-400"></error-message>
        </div>
        <div class="mb-9">
          <label for="address">地址<span class="text-red-400">*</span></label>
          <field
            type="text"
            name="地址"
            id="address"
            rules="required|min:8"
            class="w-full px-2 border-b-2"
            :class="{ 'border-red-400': errors['地址'] }"
            v-model.trim="order.address"
          />
          <error-message name="地址" class="border-red-400"></error-message>
        </div>
        <div class="mb-9">
          <label for="message">留言</label>
          <textarea
            name="留言"
            id="message"
            cols="20"
            rows="2"
            rules="max:30"
            class="w-full px-2 border-b-2"
            v-model.trim="order.message"
          ></textarea>
          <error-message name="留言"></error-message>
        </div>
        <div>
          <base-btn submit class="w-full">下一步</base-btn>
        </div>
      </v-from>
    </div>
  </div>
</template>

<script>
/* eslint-disable object-curly-newline */
import { Form as vFrom, Field, configure, defineRule, ErrorMessage } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
/* eslint-enable  */
import { localize } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import Breadcrumb from '../../../components/forestage/cart/Breadcrumb.vue';

configure({
  generateMessage: localize('zh_TW', zhTW),
});

defineRule('email', email);
defineRule('required', required);
defineRule('min', min);

export default {
  components: {
    vFrom,
    Field,
    ErrorMessage,
    Breadcrumb,
  },
  data() {
    return {
      order: {
        name: '',
        email: '',
        phone: null,
        address: '',
        message: '',
      },
    };
  },
  methods: {
    phoneNumber(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼';
    },
    onSubmit() {
      const data = {
        ...this.order,
      };
      this.$store.dispatch('forestageOrder/orderInformation', data);
      this.$router.push('/ordercheck');
    },
    editOrder() {
      const order = this.$store.getters['forestageOrder/orderInformation'] ?? {};
      if (order.name !== '' && order.name !== undefined) {
        this.order = order;
      }
    },
    orderClear() {
      this.order.name = '';
      this.order.email = '';
      this.order.phone = null;
      this.order.address = '';
      this.order.message = '';
    },
  },
  mounted() {
    this.editOrder();
  },
  unmounted() {
    this.orderClear();
  },
};
</script>
