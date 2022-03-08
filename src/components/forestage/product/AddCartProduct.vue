<template>
  <table class="mb-5 text-center" @click="toProductDetail(product.id)">
    <tr>
      <th></th>
      <th class="lg:px-3 lg:py-1">數量</th>
      <th class="px-3 py-1">價格</th>
    </tr>
    <tr>
      <td class="flex flex-col items-center lg:flex-row">
        <img :src="product.imageUrl" :alt="product.title" class="mr-3 w-[100px] mb-2 lg:mb-0" />
        <p>{{ product.title }}</p>
      </td>
      <td>{{ quantity }}</td>
      <td>{{ product.price }}</td>
    </tr>
  </table>
  <!-- toCart -->
  <router-link to="/cart">
    <base-btn class="w-full">查看購物車</base-btn>
  </router-link>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    quantity: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    toProductDetail(id) {
      const path = `/product/${id}`;
      this.$router.push(path);
    },
  },
};
</script>
