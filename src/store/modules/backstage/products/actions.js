const apiPath = process.env.VUE_APP_API_PATH;
const apiUrl = `${apiPath}/admin/product`;
export default {
  async getProducts(context) {
    try {
      const url = `${apiUrl}s/all`;
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
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  getEditProductData(context, payload) {
    context.commit('getEditProductData', payload);
  },
  async deleteProduct(context, payload) {
    try {
      const url = `${apiUrl}/${payload}`;
      await context.dispatch('axios/delete', url, {
        root: true,
      });
      context.dispatch('getProducts');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  async editProduct(context, payload) {
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
      context.dispatch('getProducts');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  async addProduct(context, payload) {
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
      context.dispatch('getProducts');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
};
