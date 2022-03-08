export default {
  async getProducts(context) {
    const url = 'api/tita/products/all';
    const res = await context.dispatch('axios/get', url, {
      root: true,
    });
    context.commit('getProducts', res.data.products);
  },
  async getProductDetails(context, payload) {
    const url = `api/tita/product/${payload}`;
    const res = await context.dispatch('axios/get', url, {
      root: true,
    });
    context.commit('getProduct', res.data.product);
  },
};
