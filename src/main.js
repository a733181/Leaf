import { createApp } from 'vue';

import AOS from 'aos';
import 'aos/dist/aos.css';

import App from './App.vue';
import router from './router';
import store from './store';

import './assets/tailwind.css';

import BaseLoading from './components/ui/BaseLoading.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseBtn from './components/ui/BaseBtn.vue';
import BasePagination from './components/ui/BasePagination.vue';
import BaseBreadcrumb from './components/ui/BaseBreadcrumb.vue';

AOS.init({
  once: true,
});

const app = createApp(App);
app.component('BaseBtn', BaseBtn);
app.component('BaseLoading', BaseLoading);
app.component('BaseDialog', BaseDialog);
app.component('BasePagination', BasePagination);
app.component('BaseBreadcrumb', BaseBreadcrumb);
app.use(store);
app.use(router);
app.mount('#app');
