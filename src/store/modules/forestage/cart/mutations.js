export default {
  addCart(state, payload) {
    state.addCartMessage = payload;
  },
  getCart(state, payload) {
    state.cartData = payload;
  },
  orderInformation(state, payload) {
    state.orderInformation = payload;
  },
};
