<template>
  <TheHeader />
  <div class="lg:min-h-[calc(100vh-80px)] min-h-[calc(100vh-104px)]">
    <RouterView v-slot="{ Component }">
      <transition name="router" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
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

<style scoped>
.router-enter-from,
.router-leave-to {
  opacity: 0;
}
.router-enter-active {
  transition: opacity 200ms ease-out;
}
.router-leave-active {
  transition: opacity 200ms ease-in;
}

.router-enter-to,
.router-leave-from {
  opacity: 1;
}
</style>
