export default {
  getCoupon(state, payload) {
    state.couponData = payload;
  },
  getEditCouponData(state, payload) {
    state.editCouponData = payload;
  },
};
