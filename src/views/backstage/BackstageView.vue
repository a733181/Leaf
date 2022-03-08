<template>
  <the-header class="mb-10" v-if="!$route.meta.hiddenHeader"></the-header>
  <div class="container px-4 mx-auto min-h-[calc(100vh-192px)]">
    <router-view></router-view>
  </div>
  <the-footer class="mt-10" adminLogin></the-footer>
</template>

<script>
import TheHeader from '../../components/backstage/header/TheHeader.vue';
import TheFooter from '../../components/footer/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
