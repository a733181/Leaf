export default {
  async getCoupon(context) {
    const url = 'api/tita/admin/coupons';
    const res = await context.dispatch('axios/get', url, {
      root: true,
    });
    context.commit('getCoupon', res.data.coupons);
  },
  async addCoupon(context, payload) {
    const data = {
      url: 'api/tita/admin/coupon',
      data: {
        data: {
          ...payload,
        },
      },
    };
    await context.dispatch('axios/post', data, {
      root: true,
    });
  },
  getEditCouponData(context, payload) {
    const data = JSON.parse(JSON.stringify(payload));
    context.commit('getEditCouponData', data);
  },
  async editCoupon(context, payload) {
    const data = {
      url: `api/tita/admin/coupon/${payload.id}`,
      data: {
        data: {
          ...payload,
        },
      },
    };
    await context.dispatch('axios/put', data, {
      root: true,
    });
  },
  async deleteCoupon(context, payload) {
    const url = `api/tita/admin/coupon/${payload}`;
    await context.dispatch('axios/delete', url, {
      root: true,
    });
  },
};
