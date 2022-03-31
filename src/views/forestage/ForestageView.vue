<template>
  <TheHeader />
  <div class="lg:min-h-[calc(100vh-80px)] min-h-[calc(100vh-104px)]">
    <router-view></router-view>
  </div>
  <TheFooter class="mt-10" />
</template>

<script>
import TheHeader from '@/components/forestage/header/TheHeader.vue';
import TheFooter from '@/components/footer/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
