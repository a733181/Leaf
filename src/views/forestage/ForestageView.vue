<template>
  <the-header></the-header>
  <div class="lg:min-h-[calc(100vh-80px)] min-h-[calc(100vh-104px)]">
    <router-view></router-view>
  </div>
  <the-footer class="mt-10"></the-footer>
</template>

<script>
import TheHeader from '../../components/forestage/header/TheHeader.vue';
import TheFooter from '../../components/footer/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
