<template>
  <TheHeader v-if="!$route.meta.hiddenHeader" />
  <div class="container px-4 mx-auto min-h-[calc(100vh-192px)] my-10">
    <RouterView />
  </div>
  <TheFooter adminLogin />
</template>

<script>
import TheHeader from '@/components/backstage/header/TheHeader.vue';
import TheFooter from '@/components/footer/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
