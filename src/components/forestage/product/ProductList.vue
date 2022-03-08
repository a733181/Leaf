<template>
  <ul class="flex flex-col gap-5 lg:flex-wrap lg:flex-row">
    <li v-for="product in productsData" :key="product.id" class="border border-[#e4e6e8]">
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="lg:w-[300px] lg:h-[200px] object-cover"
        @click="productDetail(product.id)"
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
    </li>
  </ul>
</template>

<script>
export default {
  props: ['products-data'],
  emits: ['product-detail', 'add-cart'],
  computed: {},
  methods: {
    productDetail(id) {
      this.$emit('product-detail', id);
    },
    addCart(id) {
      this.$emit('add-cart', id);
    },
  },
};
</script>
