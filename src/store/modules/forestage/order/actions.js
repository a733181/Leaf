const apiPath = process.env.VUE_APP_API_PATH;
const apiOrderUrl = `${apiPath}/order`;
export default {
  async sendOrder(context, payload) {
    try {
      const data = {
        url: apiOrderUrl,
        data: {
          data: {
            ...payload,
          },
        },
      };
      const res = await context.dispatch('axios/post', data, {
        root: true,
      });
      context.commit('getOrderID', res.data.orderId);
      context.dispatch('forestageCart/getCart', '', {
        root: true,
      });
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  async getOrder(context, payload) {
    const url = `${apiOrderUrl}/${payload}`;
    const res = await context.dispatch('axios/get', url, {
      root: true,
    });
    context.commit('getOrder', res.data.order);
  },
  async payOrder(context) {
    try {
      const orderId = context.getters.orderId || context.getters.order.id;
      const data = {
        url: `${apiPath}/pay/${orderId}`,
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
