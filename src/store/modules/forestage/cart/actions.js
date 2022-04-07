const apiPath = process.env.VUE_APP_API_PATH;
const apiUrl = `${apiPath}/cart`;
export default {
  async addCart(context, payload) {
    try {
      const data = {
        url: apiUrl,
        data: {
          ...payload,
        },
      };
      const res = await context.dispatch('axios/post', data, {
        root: true,
      });
      if (res.data.message) {
        context.commit('getAddCartMessage', true);
      }

      const productsData = context.rootGetters['forestageProducts/productsData'];
      const [addCartProduct] = productsData.filter((item) => item.id === payload.data.product_id);
      context.commit('getAddCartProduct', addCartProduct);
      context.dispatch('getCart');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  async getCart(context) {
    const res = await context.dispatch('axios/get', apiUrl, {
      root: true,
    });

    context.commit('getCart', res.data.data.carts);
  },
  async changeProductQuantity(context, payload) {
    try {
      const data = {
        url: `${apiUrl}/${payload.id}`,
        data: {
          data: {
            ...payload.data,
          },
        },
      };
      await context.dispatch('axios/put', data, {
        root: true,
      });
      context.dispatch('getCart');
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  async deleteProduct(context, payload) {
    const url = `${apiUrl}${payload.length > 1 ? `/${payload}` : 's'}`;
    await context.dispatch('axios/delete', url, {
      root: true,
    });
  },
};
