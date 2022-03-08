export default {
  orderInformation(context, payload) {
    context.commit('orderInformation', payload);
  },
  async sendOrder(context) {
    const order = context.getters.orderInformation;
    const payload = {
      url: 'api/tita/order',
      data: {
        data: {
          user: {
            name: order.name,
            email: order.email,
            tel: order.phone,
            address: order.address,
          },
          message: order.message,
        },
      },
    };

    const res = await context.dispatch('axios/post', payload, {
      root: true,
    });
    context.commit('sendOrder', res.data.orderId);
  },
  async getOrder(context, payload) {
    const url = `/api/tita/order/${payload}`;
    const res = await context.dispatch('axios/get', url, {
      root: true,
    });
    context.commit('getOrder', res.data.order);
  },
};
