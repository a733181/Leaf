export default {
  async getOrder(context) {
    const url = 'api/tita/admin/orders';
    const res = await context.dispatch('axios/get', url, {
      root: true,
    });
    context.commit('getOrder', res.data.orders);

    const dataLength = res.data.orders.length;

    // setPageNumber
    const showItem = context.rootGetters['pagination/backstageShowItem'];
    const allPage = Math.ceil(dataLength / showItem);
    context.dispatch('pagination/setAllPage', allPage, {
      root: true,
    });
    context.dispatch('pagination/setCurrentPage', 1, {
      root: true,
    });
  },
  async editOrder(context, payload) {
    const data = {
      url: `api/tita/admin/order/${payload.id}`,
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
  async deleteOrder(context, payload) {
    const url = `api/tita/admin/${payload === undefined ? 'orders/all' : `order/${payload}`}`;

    await context.dispatch('axios/delete', url, {
      root: true,
    });
  },
};
