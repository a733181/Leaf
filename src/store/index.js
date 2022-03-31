import { createStore } from 'vuex';
import AxiosModules from './modules/axios/index';
import PaginationModules from './modules/pagination/index';
import LoadingModules from './modules/loading';
import DialogModules from './modules/dialog/index';

import BackstageAuthModules from './modules/backstage/auth/index';
import BackstageProductsModules from './modules/backstage/products/index';
import BackstageOrderModules from './modules/backstage/order/index';
import BackstageCouponModules from './modules/backstage/coupon/index';

import ForestageProductsModules from './modules/forestage/product/index';
import ForestageCartModules from './modules/forestage/cart/index';
import ForestageOrderModules from './modules/forestage/order/index';
import ForestageCouponModules from './modules/forestage/coupon/index';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    axios: AxiosModules,
    pagination: PaginationModules,
    dialog: DialogModules,
    loading: LoadingModules,

    backstageAuth: BackstageAuthModules,
    backstageProducts: BackstageProductsModules,
    backstageOrder: BackstageOrderModules,
    backstageCoupon: BackstageCouponModules,

    forestageProducts: ForestageProductsModules,
    forestageCart: ForestageCartModules,
    forestageOrder: ForestageOrderModules,
    forestageCoupon: ForestageCouponModules,
  },
});
