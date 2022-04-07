<template>
  <div class="flex items-center mb-4">
    <h2 class="mr-2 text-lg">訂單編號：</h2>
    <p>{{ data.id }}</p>
  </div>
  <form action="" @submit.prevent="editOrderFrom">
    <div class="mb-3">
      <label for="name" class="mb-2">姓名：</label>
      <input
        type="text"
        id="name"
        v-model="data.user.name"
        class="border-gray-400 input"
        :class="errorClass('name')"
        @blur="errorType = ''"
      />
    </div>
    <div class="mb-3">
      <label for="phone">電話：</label>
      <input
        type="tel"
        id="phone"
        v-model="data.user.tel"
        class="border-gray-400 input"
        :class="errorClass('phone')"
        @blur="errorType = ''"
      />
    </div>
    <div class="mb-3">
      <label for="email">Email：</label>
      <input
        type="email"
        id="email"
        v-model="data.user.email"
        class="border-gray-400 input"
        :class="errorClass('email')"
        @blur="errorType = ''"
      />
    </div>
    <div class="mb-3">
      <label for="address">地址：</label>
      <input
        type="text"
        id="address"
        v-model="data.user.address"
        class="border-gray-400 input"
        :class="errorClass('address')"
        @blur="errorType = ''"
      />
    </div>
    <div class="mb-3">
      <label for="message">留言：</label>
      <input
        type="text"
        id="message"
        v-model="data.message"
        class="border-gray-400 input"
        :class="errorClass('message')"
        @blur="errorType = ''"
      />
    </div>
    <div class="mb-3">
      <label for="isPaid" class="mr-3">是否付款</label>
      <input type="checkbox" id="isPaid" v-model="data.is_paid" :checked="data.is_paid" />
    </div>
    <div class="mb-6">
      <label for="due_date" class="mb-1">付款日</label>
      <Datepicker v-model="date" autoApply :format="formatDate" :required="data.is_paid" />
    </div>
    <div class="flex justify-between gap-4">
      <BaseBtn red-outline class="w-1/2" @click="close">取消</BaseBtn>
      <BaseBtn type="submit" class="w-1/2">送出</BaseBtn>
    </div>
  </form>
</template>

<script>
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';

export default {
  emits: ['close'],
  components: { Datepicker },
  data() {
    return {
      data: {},
      errorType: '',
      date: null,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async editOrderFrom() {
      this.errorType = '';
      if (this.data.user.name === '') {
        this.errorType = 'name';
        return;
      }
      if (!this.phoneNumber(this.data.user.tel)) {
        this.errorType = 'phone';
        return;
      }
      if (!this.email(this.data.user.email)) {
        this.errorType = 'email';
        return;
      }
      if (this.data.user.address === '' || this.data.user.address.length < 6) {
        this.errorType = 'address';
        return;
      }
      const date = Date.parse(this.date) / 1000;
      this.data.paid_date = date;
      await this.$store.dispatch('backstageOrder/editOrder', this.data);
      this.close();
    },
    phoneNumber(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value);
    },
    email(value) {
      const email = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return email.test(value);
    },
    errorClass(type) {
      if (this.errorType === type) {
        return 'border-red-400';
      }
      return 'border-gray-400';
    },
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return ` ${year}/${month < 10 ? `0${month}` : month}/${day} ${
        hours < 10 ? `0${hours}` : hours
      }:${minutes < 10 ? `0${minutes}` : minutes}`;
    },
  },
  created() {
    const editOrderData = this.$store.getters['backstageOrder/editOrderData'];
    this.data = JSON.parse(JSON.stringify(editOrderData));
    const date = new Date(this.data.paid_date * 1000);
    this.date = date;
  },
};
</script>

<style lang="postcss" scoped>
.input {
  @apply w-full px-2 py-1 mt-2 bg-gray-200 border-2 rounded-md;
}
</style>
