export default {
  orderInformation(context, payload) {
    context.commit('orderInformation', payload);
  },
  async sendOrder(context) {
    try {
      const data = context.getters.orderInformation;
      const payload = {
        url: 'api/tita/order',
        data: {
          data,
        },
      };
      const res = await context.dispatch('axios/post', payload, {
        root: true,
      });
      context.commit('sendOrder', res.data.orderId);
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  async getOrder(context, payload) {
    const url = `/api/tita/order/${payload}`;
    const res = await context.dispatch('axios/get', url, {
      root: true,
    });
    context.commit('getOrder', res.data.order);
  },
  async payOrder(context) {
    try {
      const orderId = context.getters.orderId || context.getters.order.id;
      const data = {
        url: `api/tita/pay/${orderId}`,
      };
      await context.dispatch('axios/post', data, {
        root: true,
      });
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
};
