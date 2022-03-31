import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      productCategoryList: [],
      filterProductCategory: '全部商品',
      productAddCartId: '',
    };
  },
  actions,
  mutations,
  getters,
};
