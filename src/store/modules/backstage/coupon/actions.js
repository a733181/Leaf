const apiPath = process.env.VUE_APP_API_PATH;
const apiUrl = `${apiPath}/admin/coupon`;
export default {
  async getCoupon(context) {
    try {
      const url = `${apiUrl}s`;
      const res = await context.dispatch('axios/get', url, {
        root: true,
      });
      context.commit('getCoupon', res.data.coupons);
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  async addCoupon(context, payload) {
    try {
      const data = {
        url: apiUrl,
        data: {
          data: {
            ...payload,
          },
        },
      };
      await context.dispatch('axios/post', data, {
        root: true,
      });
      context.dispatch('getCoupon');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  getEditCouponData(context, payload) {
    const data = JSON.parse(JSON.stringify(payload));
    context.commit('getEditCouponData', data);
  },
  async editCoupon(context, payload) {
    try {
      const data = {
        url: `${apiUrl}/${payload.id}`,
        data: {
          data: {
            ...payload,
          },
        },
      };
      await context.dispatch('axios/put', data, {
        root: true,
      });
      context.dispatch('getCoupon');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  async deleteCoupon(context, payload) {
    try {
      const url = `${apiUrl}/${payload}`;
      await context.dispatch('axios/delete', url, {
        root: true,
      });
      context.dispatch('getCoupon');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
};
