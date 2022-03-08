<template>
  <ul class="grid grid-cols-1 mb-8 lg:text-lg sm:grid-cols-3">
    <li
      :class="
        mode === 'cart'
          ? ['breadcrumb-active', 'breadcrumb-active-right-arrow']
          : ['breadcrumb-item', 'breadcrumb-right-arrow']
      "
    >
      購物車
    </li>
    <li
      :class="
        mode === 'information'
          ? ['breadcrumb-active', 'breadcrumb-active-right-arrow']
          : ['breadcrumb-item', 'breadcrumb-right-arrow']
      "
    >
      輸入訂購人資訊
    </li>
    <li :class="mode === 'check' ? 'breadcrumb-active' : 'breadcrumb-item'">確認訂單詳情</li>
  </ul>
</template>

<script>
export default {
  props: ['mode'],
};
</script>

<style lang="postcss" scoped>
.breadcrumb-item {
  @apply bg-gray-200 text-center p-2 relative;
}

.breadcrumb-right-arrow:before {
  content: '';
  position: absolute;
  top: 0;
  right: -30px;
  width: 0;
  height: 0;
  border: 1px solid;
  border-width: 22px 0px 22px 30px;
  border-color: transparent transparent transparent rgb(209 213 219);
  z-index: 1;
}

.breadcrumb-right-arrow:after {
  content: '';
  position: absolute;
  top: 2px;
  right: -25px;
  width: 0;
  height: 0;
  border: 1px solid;
  border-width: 20px 0px 20px 25px;
  border-color: transparent transparent transparent rgb(229 231 235);
  z-index: 2;
}

@media (max-width: 1024px) {
  .breadcrumb-item:before {
    right: -15px;
    border-width: 20px 0px 20px 15px;
  }
  .breadcrumb-item:after {
    right: -10px;
    border-width: 18px 0px 18px 10px;
  }
}

.breadcrumb-active {
  @apply bg-[#40916C] text-white p-2 text-center relative;
}

.breadcrumb-active-right-arrow:before {
  content: '';
  position: absolute;
  top: 0;
  right: -28px;
  width: 0;
  height: 0;
  border: 1px solid;
  border-width: 22px 0px 22px 30px;
  border-color: transparent transparent transparent #40916c;
  z-index: 3;
}

@media (max-width: 1024px) {
  .breadcrumb-active-right-arrow:before {
    right: -13px;
    border-width: 20px 0px 20px 14px;
  }
}
</style>
