export default {
  namespaced: true,
  state() {
    return {};
  },
  getters: {},
  actions: {
    async useCoupon(context, payload) {
      const data = {
        url: 'api/tita/coupon',
        data: {
          data: {
            code: payload,
          },
        },
      };

      await context.dispatch('axios/post', data, {
        root: true,
      });
    },
  },
  mutations: {},
};
