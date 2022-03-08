export default {
  async getProducts(context) {
    const url = 'api/tita/admin/products/all';
    const res = await context.dispatch('axios/get', url, {
      root: true,
    });

    context.commit('getProducts', res.data.products);
    const dataLength = Object.entries(res.data.products).length;
    context.commit('setCountDataItem', dataLength);

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
  getEditProductData(context, payload) {
    context.commit('getEditProductData', payload);
  },
  async deleteProduct(context, payload) {
    const url = `api/tita/admin/product/${payload}`;
    await context.dispatch('axios/delete', url, {
      root: true,
    });
  },
  async editProduct(context, payload) {
    const data = {
      url: `api/tita/admin/product/${payload.id}`,
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
  async addProduct(context, payload) {
    const data = {
      url: 'api/tita/admin/product',
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
};
