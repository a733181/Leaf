<template>
  <base-btn red-outline class="block mb-2 ml-auto" @click="showDeleteOrder">刪除所有訂單</base-btn>
  <!-- 列表 -->
  <order-list @delete-order="deleteOrder" @edit-order-data="editOrder"></order-list>
  <!-- loading -->
  <base-loading :show="isLoading"></base-loading>
  <!-- error -->
  <base-dialog :show="!!error" title="Error" @close="closeError">
    {{ error }}
  </base-dialog>
  <!-- deleteAllCheck -->
  <base-dialog :show="switchDeleteOrder" title="刪除全部訂單" @close="closeDeleteOrder">
    <delete-order-check
      @close-delete-order="closeDeleteOrder"
      @delete-order="deleteOrder"
    ></delete-order-check>
  </base-dialog>
</template>

<script>
import OrderList from '../../components/backstage/order/OrderList.vue';
import DeleteOrderCheck from '../../components/backstage/order/DeleteOrderCheck.vue';

export default {
  components: { OrderList, DeleteOrderCheck },
  data() {
    return {
      isLoading: false,
      error: null,
      switchDeleteOrder: false,
    };
  },
  methods: {
    async getOrder() {
      try {
        await this.$store.dispatch('backstageOrder/getOrder');
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    async editOrder(data) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('backstageOrder/editOrder', data);
        this.getOrder();
      } catch (err) {
        this.error = err;
        this.isLoading = false;
      }
    },
    async deleteOrder(id) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('backstageOrder/deleteOrder', id);
        this.getOrder();

        if (id === undefined) {
          this.switchDeleteOrder = false;
        }
      } catch (err) {
        this.error = err;
        this.isLoading = false;
      }
    },
    closeError() {
      this.error = null;
    },
    showDeleteOrder() {
      this.switchDeleteOrder = true;
    },
    closeDeleteOrder() {
      this.switchDeleteOrder = false;
    },
  },
  mounted() {
    this.isLoading = true;
    this.getOrder();
  },
};
</script>
