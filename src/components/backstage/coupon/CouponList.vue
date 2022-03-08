<template>
  <table class="w-full lg:text-center mb-3">
    <thead>
      <tr class="border-b-2 border-black">
        <th class="p-2" @click="sort('title')">
          名稱
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'title'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'title'"
          />
        </th>
        <th class="p-2" @click="sort('code')">
          優惠碼
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'code'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'code'"
          />
        </th>
        <th class="p-2" @click="sort('percent')">
          折扣百分比
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'percent'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'percent'"
          />
        </th>
        <th class="p-2" @click="sort('due_date')">
          到期日
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'due_date'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'due_date'"
          />
        </th>
        <th class="p-2" @click="sort('is_enabled')">
          是否啟用
          <img
            src="@/assets/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'is_enabled'"
          />
          <img
            src="@/assets/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'is_enabled'"
          />
        </th>
        <th class="p-2">變更 / 刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="coupon in couponData" :key="coupon.id" class="border-b-2">
        <td class="p-2">{{ coupon.title }}</td>
        <td class="p-2">{{ coupon.code }}</td>
        <td class="p-2">{{ coupon.percent }}</td>
        <td class="p-2">{{ changeDate(coupon.due_date) }}</td>
        <td class="p-2" :class="{ 'text-red-500': coupon.is_enabled === 0 }">
          {{ coupon.is_enabled === 0 ? '未啟用' : '啟用' }}
        </td>
        <td class="p-2">
          <base-btn outline class="mr-2" @click="tryEditCoupon(coupon)">變更</base-btn>
          <base-btn red-outline @click="deleteCoupon(coupon.id)">刪除</base-btn>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- edit -->
  <base-dialog :show="switchEditCoupon" productModel @close="closeEditCoupon" title="變更優惠碼">
    <coupon-form @close-coupon-form="closeEditCoupon" @coupon-data="editCoupon"></coupon-form>
  </base-dialog>
  <!-- pagination -->
  <base-pagination></base-pagination>
</template>

<script>
import CouponForm from './CouponForm.vue';

export default {
  components: { CouponForm },
  emits: ['edit-coupon-data', 'delete-coupon-id'],
  data() {
    return {
      switchEditCoupon: false,
      sortType: 'title',
      toSort: false,
    };
  },
  computed: {
    countPageData() {
      const currentPage = this.$store.getters['pagination/currentPage'];
      const showItem = this.$store.getters['pagination/backstageShowItem'];
      const start = (currentPage - 1) * showItem;
      const end = currentPage * showItem;
      return { start, end, showItem };
    },
    couponData() {
      const data = this.$store.getters['backstageCoupon/couponData'] ?? [];
      this.allPage(data);
      const sortData = data.sort((itemA, itemB) => {
        if (itemA[this.sortType] > itemB[this.sortType]) return this.toSort ? -1 : 1;
        if (itemA[this.sortType] < itemB[this.sortType]) return this.toSort ? 1 : -1;
        return 0;
      });
      const newData = sortData.slice(this.countPageData.start, this.countPageData.end);

      return newData;
    },
  },
  methods: {
    allPage(data) {
      const dataLength = data.length;
      const allPage = Math.ceil(dataLength / this.countPageData.showItem);
      console.log(data.length);
      console.log(allPage);
      this.$store.dispatch('pagination/setAllPage', allPage);
    },
    changeDate(date) {
      const changeDate = new Date(date);
      const year = changeDate.getFullYear();
      const month = changeDate.getMonth();
      const day = changeDate.getDay();
      const hours = changeDate.getHours();
      const min = changeDate.getMinutes();
      return `${year}/${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day} ${
        hours < 10 ? `0${hours}` : hours
      }:${min < 10 ? `0${min}` : min}`;
    },
    sort(type) {
      this.toSort = !this.toSort;
      this.sortType = type;
    },
    tryEditCoupon(data) {
      this.$store.dispatch('backstageCoupon/getEditCouponData', data);
      this.switchEditCoupon = true;
    },
    closeEditCoupon() {
      this.switchEditCoupon = false;
    },
    editCoupon(data) {
      this.$emit('edit-coupon-data', data);
    },
    deleteCoupon(id) {
      this.$emit('delete-coupon-id', id);
    },
  },
};
</script>
