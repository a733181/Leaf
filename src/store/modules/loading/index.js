export default {
  namespaced: true,
  state() {
    return {
      isLoading: false,
    };
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    isLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    isLoading(context, payload) {
      context.commit('isLoading', payload);
    },
  },
};
