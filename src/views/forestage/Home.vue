<template>
  <div>
    <div class="mb-10 hero">
      <div class="flex flex-col items-center justify-center h-full text-white">
        <h2 class="mb-2 text-5xl font-bold">小農種植</h2>
        <h3 class="mb-6 text-3xl font-bold">新鮮現採，產地直送</h3>
        <RouterLink to="/products">
          <BaseBtn class="w-[300px] move">前往購買</BaseBtn>
        </RouterLink>
      </div>
    </div>
    <div class="container px-4 mx-auto mb-12">
      <ul class="flex flex-col items-center justify-center gap-9 lg:flex-row lg:items-start">
        <li class="lg:w-[400px] w-[300px]" data-aos="fade-up">
          <img src="@/assets/images/earth.jpg" alt="土" class="w-full mb-3 rounded-lg" />

          <h3 class="mb-2 text-3xl">有機農業</h3>
          <p>
            有機農業是一種能維護土壤、生態系統和人類健康的生產體系，遵從當地的生態節律、生物多樣性和自然循環，而不依賴會帶來不利影響的投入物質。
          </p>
        </li>
        <li class="lg:w-[400px] w-[300px]" data-aos="fade-up">
          <img src="@/assets/images/sack.jpg" alt="麻袋" class="w-full mb-3 rounded-lg" />

          <h3 class="mb-2 text-3xl">環保包裝</h3>
          <p>包裝產品採用可回收材質，降低包材對環境的負擔。</p>
        </li>
        <li class="lg:w-[400px] w-[300px]" data-aos="fade-up">
          <img src="@/assets/images/freight.jpg" alt="貨車" class="w-full mb-3 rounded-lg" />
          <h3 class="mb-2 text-3xl">產地直送</h3>
          <p>與貨運公司合作，專車配送，送貨到府</p>
        </li>
      </ul>
    </div>
    <div class="mb-12 bg-gray-100" data-aos="fade-up">
      <div class="container flex flex-col items-center justify-center p-4 px-6 mx-auto lg:flex-row">
        <h3 class="mb-2 lg:mr-6 lg:mb-0">
          限時限量優惠代碼，數量有限送完為止，結帳時請自行輸入折扣碼：
          <span class="font-bold">leafGo</span>
        </h3>
        <RouterLink to="/products">
          <BaseBtn class="w-[300px] move">前往購買</BaseBtn>
        </RouterLink>
      </div>
    </div>
    <div class="container px-4 mx-auto mb-12" data-aos="fade-up">
      <ProductMore title="熱銷商品" />
    </div>
    <div class="container px-4 mx-auto">
      <h2 class="mb-4 text-3xl font-bold">商品分類</h2>
      <ul class="grid grid-cols-1lg:gap-0 lg:grid-cols-4" data-aos="fade-up">
        <li class="hover" @click="toProducts('葉菜')">
          <img src="@/assets/images/cabbage.jpg" alt="葉菜" class="image" />
          <div class="center-words">
            <p class="text-center">葉菜</p>
            <p>點擊前往商店</p>
          </div>
        </li>
        <li class="hover" @click="toProducts('花菜')">
          <img src="@/assets/images/cauliflower.jpg" alt="花菜" class="image" />
          <div class="center-words">
            <p class="text-center">花菜</p>
            <p>點擊前往商店</p>
          </div>
        </li>
        <li class="hover" @click="toProducts('調味')">
          <img src="@/assets/images/red-shallots.jpg" alt="調味" class="image" />
          <div class="center-words">
            <p class="text-center">調味</p>
            <p>點擊前往商店</p>
          </div>
        </li>
        <li class="hover" @click="toProducts('水生')">
          <img src="@/assets/images/mung-beans.jpg" alt="水生" class="image" />
          <div class="center-words">
            <p class="text-center">水生</p>
            <p>點擊前往商店</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProductMore from '@/components/forestage/product/ProductMore.vue';

export default {
  components: { ProductMore },
  methods: {
    toProducts(category) {
      this.$store.dispatch('forestageProducts/getFilterProductCategory', category);
      this.$router.push('/products');
    },
  },
};
</script>

<style scoped>
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('../../assets/images/lettuce.jpg');
  width: 100%;
  height: 600px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
}
.image {
  width: 100%;
  height: 100%;
}
.hover {
  position: relative;
  cursor: pointer;
}
.center-words {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  z-index: 2;
  opacity: 0;
}
.hover::before {
  content: '';
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
  height: 0;
  width: 100%;
  opacity: 1;
  height: 100%;
  z-index: 1;
  transition: all linear 400ms;
}
.hover .center-words {
  opacity: 1;
}
@media (min-width: 768px) {
  .hover::before {
    opacity: 0;
    height: 0%;
  }
  .hover:hover::before {
    transition: all linear 400ms;
    opacity: 1;
    height: 100%;
  }
  .hover .center-words {
    opacity: 0;
  }
  .hover:hover .center-words {
    opacity: 1;
    transition: all linear 400ms;
  }
}

.move {
  animation: move 5s;
}

@keyframes move {
  0% {
    transform: translate(-10px);
  }
  25% {
    transform: translate(10px);
  }
  50% {
    transform: translate(-10px);
  }
  75% {
    transform: translate(10px);
  }
  100% {
    transform: translate(0px);
  }
}
</style>
