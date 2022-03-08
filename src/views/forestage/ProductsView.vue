<template>
  <div class="container flex flex-col px-4 pt-[112px] mx-auto gap-7 lg:flex-row">
    <div class="p-6 border rounded-lg min-w-max lg:px-8 lg:pt-20" v-if="!isError">
      <h2 class="mb-3 text-2xl font-bold">商品分類</h2>
      <product-category
        :category-list="productCategoryList"
        @filter-product="getFilterProduct"
        :active-category="filterProductCategory"
        v-if="productCategoryList.length > 2"
      ></product-category>
    </div>
    <div class="w-full">
      <h1 class="mb-3 text-2xl font-bold" v-if="!isError">商品清單</h1>
      <product-list
        :products-data="productsData"
        @product-detail="productDetail"
        @add-cart="addCart"
        class="w-full mb-3"
      ></product-list>
      <base-pagination></base-pagination>
    </div>
    <p v-if="isError">發生錯誤了，請重新整理頁面</p>
  </div>
  <base-loading :show="isLoading"></base-loading>
  <base-dialog :show="!!error" title="Error" @close="closeError">{{ error }}</base-dialog>
  <base-dialog :show="!!addCartMessage" title="已加入購物車" @close="closeAddCartMessage">
    <add-cart-product :product="addCartProduct" quantity="1"></add-cart-product>
  </base-dialog>
</template>

<script>
import ProductList from '../../components/forestage/product/ProductList.vue';
import ProductCategory from '../../components/forestage/product/ProductCategory.vue';
import AddCartProduct from '../../components/forestage/product/AddCartProduct.vue';

export default {
  components: {
    ProductList,
    ProductCategory,
    AddCartProduct,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      isError: false,
      productCategoryList: '',
      filterProductCategory: '全部商品',
      addCartMessage: '',
      addCartProduct: '',
    };
  },
  computed: {
    countPageData() {
      const currentPage = this.$store.getters['pagination/currentPage'];
      const showItem = this.$store.getters['pagination/forestageShowItem'];
      const start = (currentPage - 1) * showItem;
      const end = currentPage * showItem;
      return { start, end, showItem };
    },
    productsData() {
      const data = this.$store.getters['forestageProducts/productsData'];
      this.getProductCategory(data);
      const filterData = this.filterProduct(data);
      const newData = filterData.slice(this.countPageData.start, this.countPageData.end);
      return newData;
    },
  },
  watch: {
    filterProductCategory() {
      this.$store.dispatch('pagination/setCurrentPage', 1);
    },
  },
  methods: {
    allPage(data) {
      const dataLength = data.length;
      const allPage = Math.ceil(dataLength / this.countPageData.showItem);
      this.$store.dispatch('pagination/setAllPage', allPage);
    },
    async getProducts() {
      try {
        this.isError = false;
        this.isLoading = true;
        await this.$store.dispatch('forestageProducts/getProducts');
      } catch (err) {
        this.error = err;
        this.isError = true;
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
    getProductCategory(data) {
      const categoryAll = data.map((item) => item.category);

      const categoryList = new Set(categoryAll);
      const newCategory = [
        {
          category: '全部商品',
          quantity: data.length,
        },
      ];
      categoryList.forEach((list) => {
        const sums = data.reduce((sum, item) => {
          if (item.category === list) {
            const add = sum + 1;
            return add;
          }
          return sum;
        }, 0);

        newCategory.push({
          category: list,
          quantity: sums,
        });
      });

      this.productCategoryList = newCategory;
    },
    getFilterProduct(category) {
      this.filterProductCategory = category;
    },
    filterProduct(data) {
      const newData = data.filter((item) => {
        if (this.filterProductCategory === '全部商品') {
          return item;
        }
        return item.category === this.filterProductCategory;
      });
      this.allPage(newData);
      return newData;
    },
    productDetail(id) {
      const path = `/products/${id}`;
      this.$router.push(path);
    },
    closeError() {
      this.error = null;
    },
    async addCart(id) {
      try {
        this.isLoading = true;
        const data = {
          data: {
            product_id: id,
            qty: 1,
          },
        };

        await this.$store.dispatch('forestageCart/addCart', data);
        [this.addCartProduct] = this.productsData.filter((item) => item.id === id);
        this.addCartMessage = this.$store.getters['forestageCart/addCart'];
        this.getCartData();
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
