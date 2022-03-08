<template>
  <button
    class="btn"
    :class="{ 'btn-outline': outline, 'btn-red-outline': redOutline }"
    :type="submit ? null : 'button'"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    outline: {
      type: Boolean,
      required: false,
    },
    redOutline: {
      type: Boolean,
      required: false,
    },
    submit: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply text-white rounded-lg bg-[#40916C] px-3 py-2 border border-[#40916C];
}
.btn:hover {
  @apply bg-white text-[#40916C] border-[#40916C];
}
.btn:active {
  @apply bg-black text-white border-black;
}
.btn-outline {
  @apply border-[#40916C] text-[#40916C] bg-white;
}
.btn-outline:hover {
  @apply bg-[#40916C] text-white;
}
.btn-outline:active {
  @apply bg-black;
}
.btn-red-outline {
  @apply text-red-400 bg-white border border-red-400;
}
.btn-red-outline:hover {
  @apply text-white bg-red-600;
}
.btn-red-outline:active {
  @apply bg-black;
}
</style>
