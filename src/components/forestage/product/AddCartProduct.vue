<template>
  <table
    class="w-[300px] lg:w-[350px] mb-5 text-center cursor-pointer hover:opacity-60"
    @click="toProductDetail(product.id)"
  >
    <tr>
      <th></th>
      <th class="px-3 py-1">數量</th>
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
  <RouterLink to="/cart">
    <BaseBtn class="w-full">查看購物車</BaseBtn>
  </RouterLink>
</template>

<script>
export default {
  props: {
    quantity: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    product() {
      return this.$store.getters['forestageCart/addCartProduct'];
    },
  },
  methods: {
    toProductDetail(id) {
      this.$router.push(`/products/${id}`);
    },
  },
};
</script>
