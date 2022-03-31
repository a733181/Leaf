<template>
  <BaseBtn class="block mb-2 ml-auto" @click="toggleIsAddCoupon">新增優惠碼</BaseBtn>
  <CouponList />
  <BaseDialog :show="isAddCoupon" @close="toggleIsAddCoupon" product-model title="新增優惠碼">
    <CouponForm addCouponModel @close="toggleIsAddCoupon" />
  </BaseDialog>
</template>

<script>
import CouponList from '@/components/backstage/coupon/CouponList.vue';
import CouponForm from '@/components/backstage/coupon/CouponForm.vue';

export default {
  components: { CouponList, CouponForm },
  data() {
    return {
      isAddCoupon: false,
    };
  },
  methods: {
    async getCoupon() {
      await this.$store.dispatch('backstageCoupon/getCoupon');
      this.$store.dispatch('loading/isLoading', false);
    },
    toggleIsAddCoupon() {
      this.isAddCoupon = !this.isAddCoupon;
    },
  },
  mounted() {
    this.getCoupon();
    this.$store.dispatch('loading/isLoading', true);
  },
};
</script>
