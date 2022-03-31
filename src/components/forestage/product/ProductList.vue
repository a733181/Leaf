<template>
  <ul class="flex flex-col gap-5 lg:flex-wrap lg:flex-row">
    <li
      v-for="product in productsData"
      :key="product.id"
      class="border border-[#e4e6e8]"
      data-aos="fade-up"
    >
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="lg:w-[300px] lg:h-[200px] object-cover cursor-pointer hover:opacity-60"
        @click="productDetail(product.id)"
      />
      <div class="flex flex-col items-center p-6">
        <section class="flex items-end justify-center mb-2">
          <h2 class="mr-2 text-xl font-bold">{{ product.title }}</h2>
          <p>{{ product.description }}</p>
        </section>
        <div class="flex items-center justify-center text-[#40916C]">
          <p class="mr-2 text-lg">NT$ {{ product.price }}</p>
          <p class="line-through">NT$ {{ product.origin_price }}</p>
        </div>
        <BaseBtn outline class="w-full my-6" @click="productDetail(product.id)">商品詳情</BaseBtn>
        <BaseBtn class="w-full" @click="addCart(product.id)">加入購物車</BaseBtn>
      </div>
    </li>
  </ul>
  <BaseDialog :show="showAddCart" title="已加入購物車">
    <AddCartProduct quantity="1" />
  </BaseDialog>
</template>

<script>
import AddCartProduct from './AddCartProduct.vue';

export default {
  components: { AddCartProduct },
  props: ['productsData'],
  data() {
    return {
      showAddCart: false,
    };
  },
  methods: {
    productDetail(id) {
      const path = `/products/${id}`;
      this.$router.push(path);
    },
    async addCart(id) {
      this.showAddCart = false;
      const data = {
        data: {
          product_id: id,
          qty: 1,
        },
      };
      await this.$store.dispatch('forestageCart/addCart', data);
      this.showAddCart = this.$store.getters['forestageCart/addCartMessage'];
    },
  },
};
</script>
