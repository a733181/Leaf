import { createStore } from 'vuex';
import axios from './modules/axios/index';
import pagination from './modules/pagination/index';
import loading from './modules/loading';
import dialog from './modules/dialog/index';

import backstageAuth from './modules/backstage/auth/index';
import backstageProducts from './modules/backstage/products/index';
import backstageOrder from './modules/backstage/order/index';
import backstageCoupon from './modules/backstage/coupon/index';

import forestageProducts from './modules/forestage/product/index';
import forestageCart from './modules/forestage/cart/index';
import forestageOrder from './modules/forestage/order/index';
import forestageCoupon from './modules/forestage/coupon/index';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    axios,
    pagination,
    dialog,
    loading,

    backstageAuth,
    backstageProducts,
    backstageOrder,
    backstageCoupon,

    forestageProducts,
    forestageCart,
    forestageOrder,
    forestageCoupon,
  },
});
