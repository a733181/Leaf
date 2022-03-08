export default {
  orderInformation(state, payload) {
    state.orderInformation = payload;
  },
  sendOrder(state, payload) {
    state.orderId = payload;
  },
  getOrder(state, payload) {
    state.order = payload;
  },
};
