export default {
  async getOrder(context) {
    try {
      const url = 'api/tita/admin/orders';
      const res = await context.dispatch('axios/get', url, {
        root: true,
      });
      context.commit('getOrder', res.data.orders);

      const dataLength = res.data.orders.length;
      const showItem = context.rootGetters['pagination/backstageShowItem'];
      const allPage = Math.ceil(dataLength / showItem);
      context.dispatch('pagination/setAllPage', allPage, {
        root: true,
      });
      context.dispatch('pagination/setCurrentPage', 1, {
        root: true,
      });
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  getEditOrder(context, payload) {
    context.commit('getEditOrder', payload);
  },
  async editOrder(context, payload) {
    try {
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
      context.dispatch('getOrder');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  getDeleteOrder(context, payload) {
    context.commit('getDeleteOrder', payload);
  },
  async deleteOrder(context) {
    try {
      const id = context.getters.deleteOrderId;
      const url = `api/tita/admin/${id === '' ? 'orders/all' : `order/${id}`}`;

      await context.dispatch('axios/delete', url, {
        root: true,
      });
      context.dispatch('getOrder');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
};
