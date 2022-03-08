<template>
  <h1 class="mb-4 text-3xl font-bold">{{ title }}</h1>
  <swiper
    :space-between="30"
    :slides-per-view="1"
    :slides-per-column="1"
    :breakpoints="breakpoints"
  >
    <swiper-slide v-for="product in productsData" :key="product.id">
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="object-cover w-full h-[300px] lg:h-[300px] xl:h-[200px]"
      />
      <div class="flex flex-col items-center py-6">
        <section class="flex items-end justify-center mb-2">
          <h2 class="mr-2 text-xl font-bold">{{ product.title }}</h2>
          <p>{{ product.description }}</p>
        </section>
        <div class="flex items-center justify-center text-[#40916C] mb-2">
          <p class="mr-2 text-lg">NT$ {{ product.price }}</p>
          <p class="line-through">NT$ {{ product.origin_price }}</p>
        </div>
        <base-btn outline class="w-2/3 mb-2" @click="productDetail(product.id)">商品詳情</base-btn>
        <base-btn class="w-2/3" @click="addCart(product.id)">加入購物車</base-btn>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// swiper bundle styles
import 'swiper/swiper-bundle.min.css';

// swiper core styles
import 'swiper/swiper.min.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    productData: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['productDetailId', 'addCartId'],
  data() {
    return {
      isLoading: false,
      error: '',
      randomProduct: '',
      breakpoints: {
        767: {
          slidesPerView: 1,
          slidesPerColumn: 1,
        },
        1024: {
          slidesPerView: 2,
          slidesPerColumn: 1,
        },
        1280: {
          slidesPerView: 4,
          slidesPerColumn: 1,
        },
      },
    };
  },
  computed: {
    productsData() {
      const data = [...this.productData];
      const newData = data.splice(this.randomProduct, 4);
      return newData;
    },
  },
  methods: {
    productDetail(id) {
      const path = `/products/${id}`;
      this.$router.push(path);
      this.randomProductItem();
      this.$emit('productDetailId', id);
    },
    addCart(id) {
      this.$emit('addCartId', id);
    },
    randomProductItem() {
      const randomNumber = this.productData.length === 0 ? 8 : this.productData.length - 4;
      this.randomProduct = Math.floor(Math.random() * randomNumber);
    },
  },
  mounted() {
    this.randomProductItem();
  },
};
</script>

<style lang="postcss">
.swiper-slide {
  @apply w-[350px] mr-[30px] border border-[#e4e6e8];
}
</style>
