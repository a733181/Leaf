<template>
  <div class="flex items-center justify-between">
    <h2 class="mb-2 text-2xl font-extrabold">訂單列表</h2>
    <ul class="flex">
      <li class="mr-1">
        <p>
          總共有 <span> {{ orderLength }}</span>
          筆訂單 /
        </p>
      </li>
      <li>
        <p>
          本頁有
          <span> {{ orderData.length }} </span>
          筆訂單
        </p>
      </li>
    </ul>
  </div>
  <table class="block w-full mb-3 overflow-x-auto whitespace-nowrap lg:text-center lg:table">
    <thead>
      <tr class="border-b-2 border-black">
        <th class="p-2" @click="sort('id')">
          訂單編號
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'id'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'id'"
          />
        </th>
        <th class="p-2" @click="sort('name')">
          姓名
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'name'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'name'"
          />
        </th>
        <th class="p-2" @click="sort('address')">
          地址
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'address'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'address'"
          />
        </th>
        <th class="p-2" @click="sort('tel')">
          電話
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'tel'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'tel'"
          />
        </th>
        <th class="p-2" @click="sort('create_at')">
          成立時間
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'create_at'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'create_at'"
          />
        </th>
        <th class="p-2" @click="sort('is_paid')">
          是否付款
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'is_paid'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'is_paid'"
          />
        </th>
        <th class="p-2">商品明細</th>
        <th class="p-2" @click="sort('total')">
          總金額
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'total'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'total'"
          />
        </th>
        <th class="p-2">變更 / 刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orderData" :key="order.id" class="border-b-2">
        <td class="p-2">{{ order.id }}</td>
        <td class="p-2">{{ order.user.name }}</td>
        <td class="p-2">{{ order.user.address }}</td>
        <td class="p-2">{{ order.user.tel }}</td>
        <td>{{ changeDate(order.create_at) }}</td>
        <td :class="{ 'text-red-600': !order.is_paid }">
          {{ order.is_paid ? '已付款' : '未付款' }}
        </td>
        <td class="p-2">
          <base-btn @click="showProductList(order.products)">明細</base-btn>
        </td>
        <td>{{ order.total }}</td>
        <td>
          <base-btn outline class="mr-2" @click="showEditOrder(order)">變更</base-btn>
          <base-btn red-outline @click="tryDeleteOrder(order.id)">刪除</base-btn>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- edit -->
  <base-dialog :show="switchEditOrder" productModel @close="closeEditOrder" title="變更訂單狀態">
    <order-edit
      :edit-order="editOrder"
      @close-edit-order="closeEditOrder"
      @edit-order-data="editOrderData"
    ></order-edit>
  </base-dialog>
  <!-- Details -->
  <base-dialog :show="switchProductList" title="商品明細" @close="closeProductList" productModel>
    <product-list :products="productList"></product-list>
  </base-dialog>
  <!-- deleteCheck -->
  <base-dialog :show="switchDeleteOrder" title="刪除訂單" @close="closeDeleteOrder">
    <delete-order-check
      @close-delete-order="closeDeleteOrder"
      @delete-order="deleteOrder"
    ></delete-order-check>
  </base-dialog>
  <!-- pagination -->
  <base-pagination></base-pagination>
</template>

<script>
import ProductList from './ProductList.vue';
import OrderEdit from './OrderEdit.vue';
import DeleteOrderCheck from './DeleteOrderCheck.vue';

export default {
  components: { ProductList, OrderEdit, DeleteOrderCheck },
  props: {},
  emits: ['delete-order', 'edit-order-data'],
  data() {
    return {
      sortType: 'id',
      toSort: false,
      switchProductList: false,
      productList: [],
      orderLength: '',
      switchEditOrder: false,
      editOrder: {},
      switchDeleteOrder: false,
      deleteOrderId: '',
    };
  },
  computed: {
    countPageData() {
      const currentPage = this.$store.getters['pagination/currentPage'];
      const showItem = this.$store.getters['pagination/backstageShowItem'];
      const start = (currentPage - 1) * showItem;
      const end = currentPage * showItem;
      return { start, end };
    },
    orderData() {
      const data = this.$store.getters['backstageOrder/orderData'] ?? [];
      this.countOrderItem(data);

      const sortData = data.sort((itemA, itemB) => {
        const type = this.sortType;
        if (type === 'name' || type === 'tel' || type === 'address') {
          if (itemA.user[type] > itemB.user[type]) return this.toSort ? -1 : 1;
          if (itemA.user[type] < itemB.user[type]) return this.toSort ? 1 : -1;
        } else {
          if (itemA[type] > itemB[type]) return this.toSort ? -1 : 1;
          if (itemA[type] < itemB[type]) return this.toSort ? 1 : -1;
        }
        return 0;
      });

      const newData = sortData.slice(this.countPageData.start, this.countPageData.end);

      return newData;
    },
  },
  methods: {
    changeDate(date) {
      const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      };
      const orderDate = new Intl.DateTimeFormat(options).format(date * 1000);
      return orderDate;
    },
    countOrderItem(order) {
      this.orderLength = order.length;
    },
    sort(type) {
      this.toSort = !this.toSort;
      this.sortType = type;
    },
    showProductList(product) {
      const productArr = Object.entries(product).map((item) => item[1]);
      this.productList = productArr;
      this.switchProductList = true;
    },
    closeProductList() {
      this.switchProductList = false;
    },
    showEditOrder(order) {
      this.editOrder = order;
      this.switchEditOrder = true;
    },
    editOrderData(data) {
      this.$emit('edit-order-data', data);
    },
    closeEditOrder() {
      this.switchEditOrder = false;
    },
    tryDeleteOrder(id) {
      this.deleteOrderId = id;
      this.switchDeleteOrder = true;
    },
    deleteOrder() {
      this.$emit('delete-order', this.deleteOrderId);
      this.switchDeleteOrder = false;
    },
    closeDeleteOrder() {
      this.switchDeleteOrder = false;
    },
  },
};
</script>
