export default {
  getProducts(state, payload) {
    state.products = payload;
  },
  getProduct(state, payload) {
    state.product = payload;
  },
};
