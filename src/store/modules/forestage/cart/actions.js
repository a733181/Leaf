export default {
  async addCart(context, payload) {
    const data = {
      url: 'api/tita/cart',
      data: {
        ...payload,
      },
    };

    const res = await context.dispatch('axios/post', data, {
      root: true,
    });

    context.commit('addCart', res.data.message);
  },
  async getCart(context) {
    const url = 'api/tita/cart';

    const res = await context.dispatch('axios/get', url, {
      root: true,
    });

    context.commit('getCart', res.data.data.carts);
  },
  async changeProductQuantity(context, payload) {
    const data = {
      url: `api/tita/cart/${payload.id}`,
      data: {
        data: {
          ...payload.data,
        },
      },
    };
    await context.dispatch('axios/put', data, {
      root: true,
    });
  },
  async deleteProduct(context, payload) {
    const url = `api/tita/cart${payload.length > 1 ? `/${payload}` : 's'}`;
    await context.dispatch('axios/delete', url, {
      root: true,
    });
  },
};
