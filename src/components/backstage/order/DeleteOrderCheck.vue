<template>
  <p class="mb-2 text-2xl">確定要刪除訂單？ 刪除後無法回復</p>
  <div class="flex">
    <base-btn class="w-full mr-2" outline @click="closeDeleteOrder">否</base-btn>
    <base-btn class="w-full" red-outline @click="deleteOrder">是</base-btn>
  </div>
</template>

<script>
export default {
  emits: ['close-delete-order', 'delete-order'],
  methods: {
    closeDeleteOrder() {
      this.$emit('close-delete-order');
    },
    deleteOrder() {
      this.$emit('delete-order');
    },
  },
};
</script>
