<template>
  <BaseBtn red-outline class="block mb-2 ml-auto" @click="toggleIsDeleteOrder"
    >刪除所有訂單</BaseBtn
  >
  <OrderList />
  <BaseDialog :show="isDeleteOrder" @close="toggleIsDeleteOrder" title="刪除全部訂單">
    <DeleteOrderCheck @close="toggleIsDeleteOrder" />
  </BaseDialog>
</template>

<script>
import OrderList from '@/components/backstage/order/OrderList.vue';
import DeleteOrderCheck from '@/components/backstage/order/DeleteOrderCheck.vue';

export default {
  components: { OrderList, DeleteOrderCheck },
  data() {
    return {
      isDeleteOrder: false,
    };
  },
  methods: {
    async getOrder() {
      this.$store.dispatch('loading/isLoading', true);
      await this.$store.dispatch('backstageOrder/getOrder');
      this.$store.dispatch('loading/isLoading', false);
    },
    toggleIsDeleteOrder() {
      this.isDeleteOrder = !this.isDeleteOrder;
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>
