export default {
  getOrder(state, payload) {
    state.orderData = payload;
  },
  getEditOrder(state, payload) {
    state.editOrderData = payload;
  },
  getDeleteOrder(state, payload) {
    state.deleteOrderId = payload;
  },
};
