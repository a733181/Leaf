<template>
  <!-- 新增Btn -->
  <base-btn class="block mb-2 ml-auto" @click="showAddCoupon">新增優惠碼</base-btn>
  <!-- 列表 -->
  <coupon-list @edit-coupon-data="editCoupon" @delete-coupon-id="deleteCoupon"></coupon-list>
  <!-- loading -->
  <base-loading :show="isLoading"></base-loading>
  <!-- error -->
  <base-dialog :show="!!error" title="Error" @close="closeError">
    {{ error }}
  </base-dialog>
  <!-- 新增 -->
  <base-dialog :show="switchAddCoupon" @close="closeAddCoupon" product-model title="新增優惠碼">
    <coupon-form
      addCouponModel
      @close-coupon-form="closeAddCoupon"
      @coupon-data="addCoupon"
    ></coupon-form>
  </base-dialog>
</template>

<script>
import CouponList from '../../components/backstage/coupon/CouponList.vue';
import CouponForm from '../../components/backstage/coupon/CouponForm.vue';

export default {
  components: { CouponList, CouponForm },
  data() {
    return {
      error: null,
      isLoading: false,
      switchAddCoupon: false,
    };
  },
  methods: {
    async getCoupon() {
      try {
        await this.$store.dispatch('backstageCoupon/getCoupon');
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    async addCoupon(data) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('backstageCoupon/addCoupon', data);
        this.getCoupon();
      } catch (err) {
        this.error = err;
        this.isLoading = false;
      }
    },
    async editCoupon(data) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('backstageCoupon/editCoupon', data);
        this.getCoupon();
      } catch (err) {
        this.error = err;
        this.isLoading = false;
      }
    },
    showAddCoupon() {
      this.switchAddCoupon = true;
    },
    closeAddCoupon() {
      this.switchAddCoupon = false;
    },
    closeError() {
      this.error = null;
    },
    async deleteCoupon(id) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('backstageCoupon/deleteCoupon', id);
        this.getCoupon();
      } catch (err) {
        this.error = err;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.getCoupon();
    this.isLoading = true;
  },
};
</script>
