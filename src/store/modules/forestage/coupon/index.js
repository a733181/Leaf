export default {
  namespaced: true,
  state() {
    return {};
  },
  getters: {},
  actions: {
    async useCoupon(context, payload) {
      try {
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
      } catch (err) {
        context.dispatch('dialog/error', '優惠碼不正確，請重新輸入優惠碼', {
          root: true,
        });
      }
    },
  },
  mutations: {},
};
