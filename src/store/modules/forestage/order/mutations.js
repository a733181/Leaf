export default {
  getOrderID(state, payload) {
    state.orderId = payload;
  },
  getOrder(state, payload) {
    state.order = payload;
  },
};
