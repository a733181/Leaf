import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store/index';

const routes = [
  {
    path: '/',
    component: () => import('@/views/forestage/ForestageView.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/forestage/Home.vue'),
      },
      {
        path: 'products',
        component: () => import('@/views/forestage/ProductsView.vue'),
      },
      {
        path: 'products/:id',
        component: () => import('@/views/forestage/ProductDetailView.vue'),
      },
      {
        path: 'cart',
        component: () => import('@/views/forestage/CartView.vue'),
      },
      {
        path: 'order',
        component: () => import('@/views/forestage/order/OrderView.vue'),
      },
      {
        path: 'Ordercheckout',
        component: () => import('@/views/forestage/order/OrderCheckout.vue'),
      },
      {
        path: 'orderpay',
        component: () => import('@/views/forestage/order/OrderPay.vue'),
      },
      {
        path: 'question',
        component: () => import('@/views/forestage/Question.vue'),
      },
      {
        path: 'about',
        component: () => import('@/views/forestage/About.vue'),
      },
    ],
  },
  {
    path: '/:notFound(.*)',
    redirect: '/',
  },
  {
    path: '/admin',
    component: () => import('@/views/backstage/BackstageView.vue'),
    redirect: '/admin/products',
    children: [
      {
        path: 'login',
        meta: {
          hiddenHeader: true,
        },
        component: () => import('@/views/backstage/LoginView.vue'),
      },
      {
        path: 'products',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/backstage/ProductsView.vue'),
      },
      {
        path: 'order',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/backstage/OrderView.vue'),
      },
      {
        path: 'coupon',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/backstage/CouponView.vue'),
      },
    ],
  },
];

async function tryLogin() {
  try {
    await store.dispatch('backstageAuth/tryLogin');
    return true;
  } catch (err) {
    return false;
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const login = tryLogin();
    login.then((item) => {
      if (item) {
        next();
      } else {
        next('/admin/login');
      }
    });
  } else {
    next();
  }
});

export default router;
