export default {
  async getProducts(context) {
    try {
      const url = 'api/tita/products/all';
      const res = await context.dispatch('axios/get', url, {
        root: true,
      });
      context.commit('getProducts', res.data.products);
      context.commit('getProductCategory', res.data.products);
    } catch (err) {
      context.dispatch('dialog/error', err.message, {
        root: true,
      });
    }
  },
  getFilterProductCategory(context, payload) {
    context.commit('getFilterProductCategory', payload);
  },
};
