export default {
  getProducts(state, payload) {
    state.products = payload;
  },
  getFilterProductCategory(state, payload) {
    state.filterProductCategory = payload;
  },
  getProductCategory(state, payload) {
    const categoryAll = payload.map((item) => item.category);

    const categoryList = new Set(categoryAll);
    const newCategory = [
      {
        category: '全部商品',
        quantity: payload.length,
      },
    ];
    categoryList.forEach((list) => {
      const sums = payload.reduce((sum, item) => {
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
    state.productCategoryList = newCategory;
  },
};
