<template>
  <table class="block w-full overflow-y-auto text-center max-h-[500px] whitespace-nowrap">
    <thead>
      <tr class="border-b-2">
        <th class="w-1/3">商品名稱</th>
        <th class="w-1/6">單價</th>
        <th class="w-1/6">數量</th>
        <th class="w-1/6">小計</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id" class="border-b-[1px]">
        <td class="flex flex-col items-center py-3 lg:flex-row">
          <img
            :src="product.product.imageUrl"
            :alt="product.product.title"
            class="w-[100px] mb-2 lg:mb-0 lg:mr-6 object-cover"
          />
          <p>{{ product.product.title }}</p>
        </td>
        <td>{{ product.product.price }}</td>
        <td>{{ product.qty }}</td>
        <td>{{ product.final_total }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <p class="pt-2">{{ sumsPriceTotal }}</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  computed: {
    sumsPriceTotal() {
      if (this.products) {
        return this.products.reduce((sum, item) => {
          const sums = sum + item.final_total;
          return sums;
        }, 0);
      }
      return 0;
    },
  },
};
</script>
