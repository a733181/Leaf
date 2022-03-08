<template>
  <the-header></the-header>
  <div class="min-h-[calc(100vh-80px)]">
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
