<template>
  <BaseBtn class="block mb-2 ml-auto" @click="toggleIsAddProduct">新增商品</BaseBtn>
  <ProductList />
  <BaseDialog product-model title="新增商品" :show="isAddProduct" @close="toggleIsAddProduct">
    <ProductForm
      add-product-model
      @close="toggleIsAddProduct"
      class="max-h-[639px] overflow-y-auto"
    ></ProductForm>
  </BaseDialog>
</template>

<script>
import ProductList from '@/components/backstage/product/ProductList.vue';
import ProductForm from '@/components/backstage/product/ProductForm.vue';

export default {
  components: { ProductList, ProductForm },
  data() {
    return {
      isAddProduct: false,
    };
  },
  methods: {
    async getProducts() {
      await this.$store.dispatch('backstageProducts/getProducts');
      this.$store.dispatch('loading/isLoading', false);
    },
    toggleIsAddProduct() {
      this.isAddProduct = !this.isAddProduct;
    },
  },
  mounted() {
    this.getProducts();
    this.$store.dispatch('loading/isLoading', true);
  },
};
</script>
