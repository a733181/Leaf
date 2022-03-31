<template>
  <p class="mb-2 text-2xl">確定要刪除訂單？ 刪除後無法回復</p>
  <div class="flex">
    <BaseBtn class="w-full mr-2" outline @click="close">否</BaseBtn>
    <BaseBtn class="w-full" red-outline @click="deleteOrder">是</BaseBtn>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close');
    },
    async deleteOrder() {
      await this.$store.dispatch('backstageOrder/deleteOrder');
      this.close();
    },
  },
};
</script>
