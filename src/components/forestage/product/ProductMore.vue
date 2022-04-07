<template>
  <h2 class="mb-4 text-3xl font-bold">{{ title }}</h2>
  <Swiper
    :space-between="30"
    :slides-per-view="1"
    :slides-per-column="1"
    :breakpoints="breakpoints"
  >
    <SwiperSlide v-for="product in productsData.newData" :key="product.id">
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="object-cover w-full h-[300px] xl:h-[200px] hover:opacity-60 cursor-pointer"
        @click="productDetail(product.id)"
      />
      <div class="flex flex-col items-center p-6">
        <section class="flex items-end justify-center mb-2">
          <h3 class="mr-2 text-xl font-bold">{{ product.title }}</h3>
          <p>{{ product.description }}</p>
        </section>
        <div class="flex items-center justify-center text-[#40916C] mb-2">
          <p class="mr-2 text-lg">NT$ {{ product.price }}</p>
          <p class="line-through">NT$ {{ product.origin_price }}</p>
        </div>
        <BaseBtn outline class="w-full my-6" @click="productDetail(product.id)">商品詳情</BaseBtn>
        <BaseBtn class="w-full" @click="addCart(product.id)" :disabled="isLoadAddCard"
          >加入購物車</BaseBtn
        >
      </div>
    </SwiperSlide>
  </Swiper>
  <BaseDialog :show="showAddCart" title="已加入購物車">
    <AddCartProduct quantity="1" />
  </BaseDialog>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import AddCartProduct from './AddCartProduct.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
    AddCartProduct,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
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
      showAddCart: false,
      isLoadAddCard: false,
    };
  },
  computed: {
    productsData() {
      const data = this.$store.getters['forestageProducts/productsData'];
      const copyData = JSON.parse(JSON.stringify(data));
      const { length } = data;
      const newData = copyData.splice(this.randomProduct, 8);
      return { length, newData };
    },
  },
  methods: {
    productDetail(id) {
      this.$router.push(`/products/${id}`);
      this.randomProductItem();
    },
    async addCart(id) {
      this.isLoadAddCard = !this.isLoadAddCard;
      this.showAddCart = false;
      const data = {
        data: {
          product_id: id,
          qty: 1,
        },
      };
      await this.$store.dispatch('forestageCart/addCart', data);
      this.showAddCart = this.$store.getters['forestageCart/addCartMessage'];
      this.isLoadAddCard = !this.isLoadAddCard;
    },
    randomProductItem() {
      const randomNumber = this.productsData.length === 0 ? 8 : this.productsData.length - 8;
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
