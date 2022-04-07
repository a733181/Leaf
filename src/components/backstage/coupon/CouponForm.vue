<template>
  <form action="" @submit.prevent="couponForm" class="overflow-y-auto w-[350px]">
    <div class="mb-3">
      <label for="title">名稱</label>
      <input
        type="text"
        id="title"
        v-model="data.title"
        class="input"
        :class="errorClass('title')"
        @blur="errorType = ''"
      />
    </div>
    <div class="mb-3">
      <label for="code">優惠碼</label>
      <input
        type="text"
        id="code"
        v-model="data.code"
        class="input"
        :class="errorClass('code')"
        @blur="errorType = ''"
      />
    </div>
    <div class="mb-3">
      <label for="percent">折扣百分比</label>
      <input
        type="number"
        class="input"
        v-model="data.percent"
        :class="errorClass('percent')"
        @blur="errorType = ''"
      />
    </div>
    <div class="mb-3">
      <label for="due_date">到期日</label>
      <Datepicker v-model="date" autoApply :format="formatDate" required />
    </div>
    <div class="mb-6">
      <label for="isEnable" class="mr-2">是否啟用</label>
      <input type="checkbox" id="isEnable" v-model="data.is_enabled" :checked="data.is_enabled" />
    </div>
    <div class="flex justify-between gap-4">
      <BaseBtn red-outline class="w-1/2" @click="clearForm" v-if="addCouponModel">清除</BaseBtn>
      <BaseBtn red-outline class="w-1/2" @click="close" v-else>取消</BaseBtn>
      <BaseBtn type="submit" class="w-1/2">送出</BaseBtn>
    </div>
  </form>
</template>

<script>
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';

export default {
  components: { Datepicker },
  props: {
    addCouponModel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  data() {
    return {
      data: {
        title: '',
        is_enabled: 0,
        due_date: '',
        percent: null,
        code: '',
      },
      errorType: '',
      date: null,
    };
  },
  watch: {},
  methods: {
    couponForm() {
      this.errorType = '';
      if (this.data.title === '') {
        this.errorType = 'title';
        return;
      }
      if (this.data.code === '') {
        this.errorType = 'code';
        return;
      }
      if (
        this.data.percent === null
        || this.data.percent === ''
        || this.data.percent <= 0
        || this.data.percent >= 100
      ) {
        this.errorType = 'percent';
        return;
      }
      const date = Date.parse(this.date);
      this.data.due_date = date;
      this.data.is_enabled = this.data.is_enabled ? 1 : 0;

      if (this.addCouponModel) {
        this.addCoupon();
      } else {
        this.editCoupon();
      }
      this.clearForm();
      this.close();
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
    errorClass(type) {
      if (this.errorType === type) {
        return 'border-red-400';
      }
      return 'border-gray-400';
    },
    async addCoupon() {
      await this.$store.dispatch('backstageCoupon/addCoupon', this.data);
    },
    async editCoupon() {
      await this.$store.dispatch('backstageCoupon/editCoupon', this.data);
    },
    close() {
      this.$emit('close');
    },
    clearForm() {
      if (this.addCouponModel) {
        this.errorType = '';
        this.date = null;
        this.data = {
          title: '',
          is_enabled: 0,
          due_date: '',
          percent: null,
          code: '',
        };
      }
    },
  },
  mounted() {
    const coupon = this.$store.getters['backstageCoupon/editCouponData'];
    if (coupon && !this.addCouponModel) {
      this.data = coupon;
      const date = new Date(this.data.due_date);
      this.date = date;
    }
  },
};
</script>

<style lang="postcss" scoped>
.input {
  @apply w-full px-2 py-1 mt-2 bg-gray-200 border-2 rounded-md;
}
</style>

<style lang="postcss">
.dp__main {
  @apply mt-2;
}
.dp__input {
  @apply border-2 border-gray-400 bg-gray-200 rounded-md;
}
</style>
