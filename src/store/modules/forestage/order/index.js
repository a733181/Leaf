import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      orderInformation: {},
      orderId: '',
      order: '',
    };
  },
  actions,
  mutations,
  getters,
};
