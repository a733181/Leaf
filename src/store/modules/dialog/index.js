export default {
  namespaced: true,
  state() {
    return {
      error: null,
    };
  },
  getters: {
    error(state) {
      return state.error;
    },
  },
  mutations: {
    error(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    error(context, payload) {
      context.commit('error', payload);
    },
  },
};
