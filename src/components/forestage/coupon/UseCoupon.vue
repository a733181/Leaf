<template>
  <form action="" @submit.prevent="couponForm">
    <div class="flex items-center mb-2">
      <label for="coupon">優惠碼：</label>
      <input type="text" class="input" id="coupon" v-model="couponCode" />
      <base-btn submit outline>套用</base-btn>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['coupon-code'],
  data() {
    return {
      couponCode: '',
    };
  },
  computed: {},
  methods: {
    couponForm() {
      if (this.couponCode === '') {
        return;
      }
      this.$emit('coupon-code', this.couponCode);
      this.couponCode = '';
    },
  },
};
</script>

<style lang="postcss" scoped>
.input {
  @apply flex-1 px-2 py-2 border-2 rounded-md border-gray-200 ml-3 mr-3;
}
</style>
