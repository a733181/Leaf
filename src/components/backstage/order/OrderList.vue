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
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'id'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'id'"
          />
        </th>
        <th class="p-2" @click="sort('name')">
          姓名
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'name'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'name'"
          />
        </th>
        <th class="p-2" @click="sort('address')">
          地址
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'address'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'address'"
          />
        </th>
        <th class="p-2" @click="sort('tel')">
          電話
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'tel'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'tel'"
          />
        </th>
        <th class="p-2" @click="sort('create_at')">
          成立時間
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'create_at'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'create_at'"
          />
        </th>
        <th class="p-2" @click="sort('is_paid')">
          是否付款
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'is_paid'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'is_paid'"
          />
        </th>
        <th class="p-2" @click="sort('paid_date')">
          付款時間
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'paid_date'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'paid_date'"
          />
        </th>
        <th class="p-2">商品明細</th>
        <th class="p-2" @click="sort('total')">
          總金額
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'total'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
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
        <td>{{ changeDate(order.paid_date) }}</td>
        <td class="p-2">
          <BaseBtn @click="tryShowProductList(order.products)">明細</BaseBtn>
        </td>
        <td>{{ Math.round(order.total) }}</td>
        <td>
          <BaseBtn outline class="mr-2" @click="editOrder(order)">變更</BaseBtn>
          <base-btn red-outline @click="tryDeleteOrder(order.id)">刪除</base-btn>
        </td>
      </tr>
    </tbody>
  </table>
  <BaseDialog :show="isEditOrder" productModel title="變更訂單狀態" @close="toggleIsEditOrder">
    <OrderEdit @close="toggleIsEditOrder" />
  </BaseDialog>
  <BaseDialog :show="showProductList" title="商品明細" @close="toggleShowProductList" productModel>
    <ProductList :products="productList" />
  </BaseDialog>
  <BaseDialog :show="isDeleteOrder" title="刪除訂單" @close="toggleIsDeleteOrder">
    <DeleteOrderCheck @close="toggleIsDeleteOrder" />
  </BaseDialog>
  <BasePagination />
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
      isEditOrder: false,
      showProductList: false,
      productList: [],
      orderLength: '',
      isDeleteOrder: false,
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
    tryShowProductList(product) {
      const productArr = Object.entries(product).map((item) => item[1]);
      this.productList = productArr;
      this.toggleShowProductList();
    },
    editOrder(order) {
      this.$store.dispatch('backstageOrder/getEditOrder', order);
      this.toggleIsEditOrder();
    },
    tryDeleteOrder(id) {
      this.$store.dispatch('backstageOrder/getDeleteOrder', id);
      this.toggleIsDeleteOrder();
    },
    toggleShowProductList() {
      this.showProductList = !this.showProductList;
    },
    toggleIsEditOrder() {
      this.isEditOrder = !this.isEditOrder;
    },
    toggleIsDeleteOrder() {
      this.isDeleteOrder = !this.isDeleteOrder;
    },
  },
};
</script>

<style>
.container {
  overflow-x: auto;
}
</style>
