export default {
  getAddCartProduct(state, payload) {
    state.addCartProduct = payload;
  },
  getAddCartMessage(state, payload) {
    state.addCartMessage = payload;
  },
  getCart(state, payload) {
    state.cartData = payload;
  },
  orderInformation(state, payload) {
    state.orderInformation = payload;
  },
};
