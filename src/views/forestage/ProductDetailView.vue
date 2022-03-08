<template>
  <div class="container px-4 mx-auto pt-[112px]">
    <div class="grid lg:grid-cols-2 gap-7">
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
            <img :src="product.imageUrl" alt="product.title" class="object-cover w-full h-full" />
          </li>
          <li v-for="img in product.imagesUrl" :key="img" @click="cacheImage = img">
            <div class="img" v-if="img" :class="activeImg(img)">
              <img :src="img" alt="product.title" class="object-cover w-full h-full" />
            </div>
          </li>
        </ul>
      </div>
      <section class="flex flex-col mt-6">
        <div class="flex items-end mb-6">
          <h1 class="mr-2 text-4xl font-bold">{{ product.title }}</h1>
          <p class="text-xl">{{ product.description }}</p>
        </div>
        <div class="flex items-center text-[#40916C] mb-8">
          <p class="mr-3 text-3xl">NT$ {{ product.price }}</p>
          <p class="line-through">NT$ {{ product.origin_price }}</p>
        </div>
        <p class="p-3 bg-gray-100">{{ product.content }}</p>

        <div class="flex items-center my-6 lg:mt-auto lg:mb-[72px]">
          <select
            name=""
            id=""
            v-model="productQuantity"
            class="px-2 py-[6.5px] mr-3 border-2 rounded-lg lg:px-5"
          >
            <option v-for="number in 12" :value="number" :key="number">{{ number }}</option>
          </select>
          <base-btn class="w-full" @click="addCart(product.id)">加入購物車</base-btn>
        </div>
      </section>
    </div>
    <div class="py-3 mt-3 mb-6 border-t-2">
      <h2 class="mb-1 text-xl">注意事項</h2>
      <ul class="pl-5 list-disc">
        <li>
          生鮮食品不適用於消費者保護法第19條，並不享用7天鑑賞期，若您對於訂購之商品不甚滿意且希望辦理退貨時，請於到貨後4小時內拍照存證，並將問題反映客服人員
        </li>
        <li>出貨時間：付款後隔天將有專車送達</li>
      </ul>
    </div>
    <product-more
      title="更多商品"
      :product-data="productsData"
      @product-detail-id="getProductDetail"
      @add-cart-id="addCart"
    ></product-more>
  </div>
  <base-loading :show="isLoading"></base-loading>
  <base-dialog :show="!!error" title="Error" @close="closeError">{{ error }}</base-dialog>
  <base-dialog :show="!!addCartMessage" title="已加入購物車" @close="closeAddCartMessage">
    <add-cart-product :product="addCartProduct" :quantity="productQuantity"></add-cart-product>
  </base-dialog>
</template>

<script>
import AddCartProduct from '../../components/forestage/product/AddCartProduct.vue';
import ProductMore from '../../components/forestage/product/ProductMore.vue';

export default {
  components: { AddCartProduct, ProductMore },
  data() {
    return {
      isLoading: false,
      error: null,
      product: {},
      cacheImage: '',
      productQuantity: 1,
      addCartProduct: {},
      addCartMessage: '',
    };
  },
  computed: {
    productsData() {
      return this.$store.getters['forestageProducts/productsData'];
    },
  },
  methods: {
    async getProducts() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('forestageProducts/getProducts');
        this.getProductDetail(this.$route.params.id);
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    getProductDetail(id) {
      [this.product] = this.productsData.filter((item) => item.id === id);
      this.cacheImage = this.product.imageUrl;
    },
    closeError() {
      this.error = null;
    },
    activeImg(img) {
      if (this.cacheImage === img) {
        return 'activeImg';
      }
      return 'cursor-pointer';
    },
    async addCart(id) {
      try {
        this.isLoading = true;
        const data = {
          data: {
            product_id: id,
            qty: this.productQuantity,
          },
        };
        await this.$store.dispatch('forestageCart/addCart', data);
        this.addCartMessage = this.$store.getters['forestageCart/addCart'];

        [this.addCartProduct] = this.productsData.filter((item) => item.id === id);
        this.getCartData();
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    async getCartData() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('forestageCart/getCart');
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    closeAddCartMessage() {
      this.addCartMessage = '';
    },
  },
  mounted() {
    this.getProducts();
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
