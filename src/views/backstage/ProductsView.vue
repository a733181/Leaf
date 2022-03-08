<template>
  <!-- 新增btn -->
  <base-btn @click="showAddProduct" class="block mb-2 ml-auto">新增商品</base-btn>
  <!-- 列表 -->
  <product-list @delete-product="deleteProduct" @edit-product-data="editProduct" />
  <!-- error -->
  <base-loading :show="isLoading"></base-loading>
  <base-dialog :show="!!error" title="Error" @close="closeError">
    {{ error }}
  </base-dialog>
  <!-- 新增 -->
  <base-dialog :show="switchAddProduct" @close="closeAddProduct" product-model title="新增商品">
    <product-form add-product-model @product-from-data="addProduct"></product-form>
  </base-dialog>
</template>

<script>
import ProductList from '../../components/backstage/product/ProductList.vue';
import ProductForm from '../../components/backstage/product/ProductForm.vue';

export default {
  components: { ProductList, ProductForm },
  data() {
    return {
      error: null,
      isLoading: false,
      switchAddProduct: false,
    };
  },
  computed: {},
  methods: {
    async getProducts() {
      try {
        await this.$store.dispatch('backstageProducts/getProducts');
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    closeError() {
      this.error = null;
    },
    showAddProduct() {
      this.switchAddProduct = true;
    },
    closeAddProduct() {
      this.switchAddProduct = false;
    },
    async addProduct(productData) {
      this.switchAddProduct = false;
      try {
        this.isLoading = true;
        await this.$store.dispatch('backstageProducts/addProduct', productData);
        this.getProducts();
      } catch (err) {
        this.err = err;
        this.isLoading = false;
      }
    },
    async editProduct(productData) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('backstageProducts/editProduct', productData);
        this.getProducts();
      } catch (err) {
        this.error = err;
        this.isLoading = false;
      }
    },
    async deleteProduct(productId) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('backstageProducts/deleteProduct', productId);
        this.getProducts();
      } catch (err) {
        this.error = err;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.getProducts();
    this.isLoading = true;
  },
};
</script>
