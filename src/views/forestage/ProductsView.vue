<template>
  <div class="container mx-auto pt-[130px] lg:pt-[112px] px-4">
    <Breadcrumb :category="filterProductCategory" />
    <div class="flex flex-col mt-3 gap-7 lg:flex-row">
      <div class="p-2 rounded-lg min-w-max lg:pt-10">
        <h2 class="mb-3 text-2xl font-bold">商品分類</h2>
        <ProductCategory />
        <p class="block mt-3 text-gray-400 lg:hidden">點擊上方"商品分類名稱"切換"商品列表"</p>
      </div>
      <div>
        <h2 class="mb-3 text-2xl font-bold">{{ filterProductCategory }}</h2>
        <ProductList :productsData="productsData" />
        <BasePagination class="mt-3" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/forestage/product/ProductList.vue';
import ProductCategory from '@/components/forestage/product/ProductCategory.vue';
import Breadcrumb from '@/components/forestage/product/Breadcrumb.vue';

export default {
  components: {
    ProductList,
    ProductCategory,
    Breadcrumb,
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
      const filterData = this.filterProduct(data);
      const newData = filterData.slice(this.countPageData.start, this.countPageData.end);
      return newData;
    },
    filterProductCategory() {
      return this.$store.getters['forestageProducts/filterProductCategory'];
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
  },
  unmounted() {
    this.$store.dispatch('pagination/setCurrentPage', 1);
    this.$store.dispatch('forestageProducts/getFilterProductCategory', '全部商品');
  },
};
</script>
