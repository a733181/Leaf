<template>
  <table class="w-full mb-3 lg:text-center">
    <thead>
      <tr class="border-b-2 border-black">
        <th class="p-2" @click="sort('title')">
          名稱
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'title'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'title'"
          />
        </th>
        <th class="p-2" @click="sort('code')">
          優惠碼
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'code'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'code'"
          />
        </th>
        <th class="p-2" @click="sort('percent')">
          折扣百分比
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'percent'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'percent'"
          />
        </th>
        <th class="p-2" @click="sort('due_date')">
          到期日
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'due_date'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
            alt="minimize"
            class="w-[8px] inline"
            v-if="sortType !== 'due_date'"
          />
        </th>
        <th class="p-2" @click="sort('is_enabled')">
          是否啟用
          <img
            src="@/assets/svg/long-arrow-alt-down-solid.svg"
            alt="arrow"
            class="w-[8px] inline"
            :class="{ ' rotate-180': toSort }"
            v-if="sortType === 'is_enabled'"
          />
          <img
            src="@/assets/svg/window-minimize-regular.svg"
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
          <BaseBtn outline class="mr-2" @click="tryEditCoupon(coupon)">變更</BaseBtn>
          <BaseBtn red-outline @click="deleteCoupon(coupon.id)">刪除</BaseBtn>
        </td>
      </tr>
    </tbody>
  </table>
  <BaseDialog :show="isEditCoupon" productModel @close="toggleIsEditCoupon" title="變更優惠碼">
    <CouponForm @close="toggleIsEditCoupon" />
  </BaseDialog>
  <BasePagination />
</template>

<script>
import CouponForm from './CouponForm.vue';

export default {
  components: { CouponForm },
  data() {
    return {
      isEditCoupon: false,
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
      this.toggleIsEditCoupon();
    },
    toggleIsEditCoupon() {
      this.isEditCoupon = !this.isEditCoupon;
    },
    async deleteCoupon(id) {
      await this.$store.dispatch('backstageCoupon/deleteCoupon', id);
    },
  },
};
</script>
