<template>
  <teleport to="body">
    <div
      class="fixed top-0 left-0 z-20 w-full h-full bg-black/30"
      v-if="open || !!error"
      @click="close"
    ></div>
    <transition name="dialog">
      <div class="dialog" open v-if="open || !!error" :class="positionClass">
        <header class="flex items-center justify-between p-3" :class="headerClass">
          <h2 class="text-xl text-white lg:text-2xl">{{ title }}</h2>
          <img
            src="@/assets/svg/times-solid.svg"
            alt="close"
            class="w-[20px] hover:scale-150"
            @click="close"
          />
        </header>
        <div class="p-3">
          <slot></slot>
          <p v-if="!!error">{{ error }}</p>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: false,
      default: 'Error',
    },
    productModel: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['close'],
  data() {
    return {
      open: false,
    };
  },
  watch: {
    show() {
      this.open = this.show;
    },
  },
  computed: {
    error() {
      return this.$store.getters['dialog/error'];
    },
    headerClass() {
      if (this.title.includes('刪除')) {
        return 'bg-red-600';
      }
      return 'bg-[#40916C]';
    },
    positionClass() {
      if (this.productModel) {
        return ['top-6', 'absolute'];
      }
      return ['top-1/2', ' -translate-y-1/2', 'fixed'];
    },
  },
  methods: {
    close() {
      this.open = false;
      this.$store.dispatch('dialog/error', null);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.dialog {
  @apply z-30 p-0 -translate-x-1/2 bg-white rounded-lg shadow-lg left-1/2;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-active {
  transition: all 0.2s ease-out;
}
.dialog-leave-active {
  transition: all 0.2s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
}
</style>
