<template>
  <div class="container px-4 mx-auto pt-[130px] lg:pt-[112px]">
    <BaseBreadcrumb name="常見問題" />
    <h2 class="mt-3 mb-4 text-2xl font-bold text-center">常見問題</h2>
    <div class="mx-auto max-w-[400px]">
      <h3 class="mb-3 text-xl">訂單相關問題</h3>
      <ul>
        <li v-for="(item, index) in order" :key="index" class="border border-black">
          <p
            @click="item.show = !item.show"
            class="px-2 py-2 pl-2 pr-6 bg-gray-50 arrow"
            :class="{ active: item.show }"
          >
            {{ item.question }}
          </p>
          <p v-show="item.show" class="px-2 py-2 pl-2 pr-6 border-t-2">
            {{ item.answer }}
          </p>
        </li>
      </ul>
      <h3 class="mt-4 mb-3 text-xl">配送相關問題</h3>
      <ul>
        <li v-for="(item, index) in delivery" :key="index" class="border border-black">
          <p
            @click="item.show = !item.show"
            class="px-2 py-2 pl-2 pr-6 bg-gray-50 arrow"
            :class="{ active: item.show }"
          >
            {{ item.question }}
          </p>
          <p v-show="item.show" class="px-2 py-2 pl-2 pr-6 border-t-2">{{ item.answer }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: [
        {
          question: '需要註冊會員嗎？',
          answer: '不需要註冊會員即可下單。',
          show: false,
        },
        {
          question: '要怎麼付款？',
          answer: '目前僅接受線上付款。',
          show: false,
        },
        {
          question: '我想要修改訂單 / 取消訂單怎麼辦？',
          answer: '請在訂購的4小時內連繫客服修改訂單。',
          show: false,
        },
        {
          question: '我忘了訂單號碼怎麼辦？',
          answer: '請聯絡客服詢問訂單號碼。',
          show: false,
        },
        {
          question: '已收到物品後發現定錯商品，或對商品不滿意、可以換貨嗎？',
          answer:
            '生鮮食品不適用於消費者保護法第19條，並不享有7天鑑賞期，除商品本身瑕疵或運送過程而造成的損毀，才可接受您的退換貨申請。',
        },
      ],
      delivery: [
        {
          question: '可以指定到貨日嗎？',
          answer: '可以的，您的訂單都是由專人配送。',
          show: false,
        },
        {
          question: '可以寄海外或是離島嗎？',
          answer: '目前配合貨運無寄海外及離島的服務。',
          show: false,
        },
        {
          question: '我通常多久可以收到商品？',
          answer: '配送前貨運司機會先致電，請保持電話暢通。',
          show: false,
        },
        {
          question: '我想要修改地址怎麼辦？',
          answer: '因生鮮食品有配送時程，暫無更改地址服務',
          show: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
.arrow {
  position: relative;
}
.arrow:before {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  background-image: url('../../assets/svg/arrow.svg');
  background-repeat: no-repeat;
  background-position: center center;
  right: 8px;
  top: 8px;
  transform: rotate(270deg);
  transition: all 0.5s;
}
.active.arrow:before {
  content: '';
  transform: rotate(90deg);
  transition: all 0.5s;
}
</style>
