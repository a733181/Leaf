export default {
  namespaced: true,
  state() {
    return {
      currentPage: 1,
      allPage: null,
      backstageShowItem: 10,
      forestageShowItem: 12,
    };
  },
  getters: {
    currentPage(state) {
      return state.currentPage;
    },
    backstageShowItem(state) {
      return state.backstageShowItem;
    },
    forestageShowItem(state) {
      return state.forestageShowItem;
    },
    allPage(state) {
      return state.allPage;
    },
  },
  mutations: {
    setAllPage(state, payload) {
      state.allPage = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
  },
  actions: {
    setAllPage(context, payload) {
      context.commit('setAllPage', payload);
    },
    setCurrentPage(context, payload) {
      context.commit('setCurrentPage', payload);
    },
  },
};
