<template>
  <div>
    <div class="container px-4 mx-auto pt-[130px] lg:pt-[112px]">
      <Breadcrumb :category="product.category" :title="product.title" />
      <div class="grid mt-3 lg:grid-cols-2 gap-7">
        <div class="w-full">
          <img
            :src="cacheImage"
            :alt="product.title"
            class="object-cover mb-2 rounded-lg h-[400px] w-full"
          />
          <ul class="flex">
            <li
              class="img"
              :class="activeImg(product.imageUrl)"
              @click="cacheImage = product.imageUrl"
            >
              <img
                :src="product.imageUrl"
                :alt="product.title"
                class="object-cover w-full h-full"
              />
            </li>
            <li v-for="img in product.imagesUrl" :key="img" @click="cacheImage = img">
              <div class="img" v-if="img" :class="activeImg(img)">
                <img :src="img" :alt="product.title" class="object-cover w-full h-full" />
              </div>
            </li>
          </ul>
        </div>
        <section class="flex flex-col mt-6">
          <div class="flex items-end mb-6">
            <h2 class="mr-2 text-4xl font-bold">{{ product.title }}</h2>
            <p class="text-xl">{{ product.description }}</p>
          </div>
          <div class="flex items-center text-[#40916C] mb-8">
            <p class="mr-3 text-3xl">NT$ {{ product.price }}</p>
            <p class="line-through">NT$ {{ product.origin_price }}</p>
          </div>
          <p class="p-3 bg-gray-100">{{ product.content }}</p>

          <div class="flex items-center my-6 lg:mt-auto lg:mb-[72px]">
            <select
              v-model="productQuantity"
              class="px-2 py-[6.5px] mr-3 border-2 rounded-lg lg:px-5"
            >
              <option v-for="number in 12" :value="number" :key="number">{{ number }}</option>
            </select>
            <BaseBtn class="w-full" @click="addCart(product.id)" :disabled="isLoadAddCard"
              >加入購物車</BaseBtn
            >
          </div>
        </section>
      </div>
      <div class="py-3 mt-3 mb-6 border-t-2">
        <h3 class="mb-1 text-xl">規格說明</h3>
        <ul class="mb-6 ml-5">
          <li>品名：{{ product.title }}</li>
          <li>重量：{{ product.description }}</li>
          <li>包裝方式：袋裝</li>
          <li>產地：台灣</li>
          <li>產品分類：{{ product.category }}</li>
          <li>保存方式：請冷藏保存，新鮮蔬菜請盡快食用完畢</li>
          <li>配送方式：由合作物流公司配送</li>
        </ul>
        <h3 class="mb-1 text-xl">注意事項</h3>
        <ul class="pl-5 list-disc">
          <li>因天氣影響產生斷貨或缺貨商品，會由客服人員先行取消。</li>
          <li>因每季蔬菜生長情況不一，出貨以實品為主，圖片僅供參考。</li>
          <li>
            <p>生鮮食品不適用於消費者保護法第19條，並不享用7天鑑賞期。</p>
            <p>
              商品本身瑕疵或運送過程而造成的損毀，請於到貨後4小時內拍照存證，並將問題反映客服人員。
            </p>
          </li>
          <li>出貨時間：配送前貨運司機會先致電，請保持電話暢通。</li>
        </ul>
      </div>
      <ProductMore title="更多商品" />
    </div>
    <BaseDialog :show="showAddCart" title="已加入購物車">
      <AddCartProduct :quantity="productQuantity" />
    </BaseDialog>
  </div>
</template>

<script>
import AddCartProduct from '@/components/forestage/product/AddCartProduct.vue';
import ProductMore from '@/components/forestage/product/ProductMore.vue';
import Breadcrumb from '@/components/forestage/product/Breadcrumb.vue';

export default {
  components: { AddCartProduct, ProductMore, Breadcrumb },
  data() {
    return {
      product: {},
      cacheImage: '',
      productQuantity: 1,
      showAddCart: false,
      isLoadAddCard: false,
    };
  },
  computed: {
    productsData() {
      return this.$store.getters['forestageProducts/productsData'];
    },
  },
  watch: {
    '$route.params.id': function () {
      this.productDetail(this.$route.params.id);
    },
    productsData() {
      this.productDetail(this.$route.params.id);
    },
  },
  methods: {
    productDetail(id) {
      const data = this.productsData;
      const [product] = data.filter((item) => item.id === id);
      if (product) {
        this.product = product;
      }
      this.cacheImage = this.product.imageUrl;
    },
    activeImg(img) {
      if (this.cacheImage === img) {
        return 'activeImg';
      }
      return 'cursor-pointer';
    },
    async addCart(id) {
      this.isLoadAddCard = !this.isLoadAddCard;
      this.showAddCart = false;
      const data = {
        data: {
          product_id: id,
          qty: this.productQuantity,
        },
      };
      await this.$store.dispatch('forestageCart/addCart', data);
      this.showAddCart = this.$store.getters['forestageCart/addCartMessage'];
      this.isLoadAddCard = !this.isLoadAddCard;
    },
  },
  mounted() {
    this.productDetail(this.$route.params.id);
  },
};
</script>

<style lang="postcss" scoped>
.img {
  @apply border-2 mr-2 opacity-50 p-1 w-[100px] h-[66px];
}
.activeImg {
  @apply opacity-100;
}
</style>
