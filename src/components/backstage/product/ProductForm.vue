<template>
  <form action="" @submit.prevent="submitFrom">
    <div class="p-3 lg:flex lg:gap-7">
      <div class="lg:w-[300px]">
        <!-- 主圖 -->
        <div class="mb-3">
          <label for="imageUrl" class="text-xl"><span class="text-red-500">*</span>主圖</label>
          <input
            type="text"
            id="imageUrl"
            v-model="data.imageUrl"
            class="mb-3 input"
            :class="errorClass('imageUrl')"
            @blur="errorType = ''"
            placeholder="輸入圖片網址"
          />
          <!-- 主圖預覽 -->
          <div class="w-full h-full mb-2 border-2 border-gray-600">
            <p class="p-1">主圖預覽</p>
            <img
              :src="data.imageUrl"
              alt="主圖預覽"
              class="object-cover w-full"
              v-if="!!data.imageUrl"
            />
          </div>
        </div>
      </div>
      <div>
        <!-- 詳情圖-0 -->
        <div class="mb-3">
          <label for="imagesUrl0" class="text-xl">詳情圖-1</label>
          <input
            type="text"
            id="imagesUrl0"
            v-model="data.imagesUrl[0]"
            class="input"
            :class="errorClass('imagesUrl0')"
            placeholder="輸入圖片網址"
            @blur="errorType = ''"
          />
        </div>
        <!-- 詳情圖-1 -->
        <div class="mb-3">
          <label for="imagesUrl1" class="text-xl">詳情圖-2</label>
          <input
            type="text"
            id="imagesUrl1"
            v-model="data.imagesUrl[1]"
            class="input"
            :class="errorClass('imagesUrl1')"
            placeholder="輸入圖片網址"
            @blur="errorType = ''"
          />
        </div>
        <!-- 詳情圖-2 -->
        <div class="mb-3">
          <label for="imagesUrl2" class="text-xl">詳情圖-3</label>
          <input
            type="text"
            id="imagesUrl2"
            v-model="data.imagesUrl[2]"
            class="input"
            :class="errorClass('imagesUrl2')"
            placeholder="輸入圖片網址"
            @blur="errorType = ''"
          />
        </div>
        <!-- 詳情圖-3-->
        <div class="mb-3">
          <label for="imagesUrl3" class="text-xl">詳情圖-4</label>
          <input
            type="text"
            id="imagesUrl3"
            v-model="data.imagesUrl[3]"
            class="input"
            :class="errorClass('imagesUrl3')"
            placeholder="輸入圖片網址"
            @blur="errorType = ''"
          />
        </div>
        <!-- 詳情圖-4 -->
        <div class="mb-3">
          <label for="imagesUrl4" class="text-xl">詳情圖-5</label>
          <input
            type="text"
            id="imagesUrl4"
            v-model="data.imagesUrl[4]"
            class="mb-3 input"
            :class="errorClass('imagesUrl4')"
            placeholder="輸入圖片網址"
            @blur="errorType = ''"
          />
        </div>
      </div>
      <div class="2xl:w-[600px]">
        <!-- 名稱 -->
        <div class="mb-3">
          <label for="title" class="text-xl"><span class="text-red-500">*</span>名稱</label>
          <input
            type="text"
            id="title"
            v-model="data.title"
            class="input"
            :class="errorClass('title')"
            @blur="errorType = ''"
          />
        </div>
        <!-- 描述/副標 -->
        <div class="mb-3">
          <label for="description" class="text-xl">描述 / 副標題</label>
          <input
            type="text"
            id="description"
            class="border-gray-400 input"
            v-model="data.description"
          />
        </div>
        <!-- 原價/售價 -->
        <div class="flex gap-2">
          <div class="w-full mb-3">
            <label for="originPrice" class="text-xl"><span class="text-red-500">*</span>原價</label>
            <input
              type="number"
              id="originPrice"
              class="input"
              v-model="data.origin_price"
              :class="errorClass('originPrice')"
              @blur="errorType = ''"
            />
          </div>
          <div class="w-full">
            <label for="price" class="text-xl"><span class="text-red-500">*</span>售價</label>
            <input
              type="number"
              id="price"
              v-model="data.price"
              class="input"
              :class="errorClass('price')"
              @blur="errorType = ''"
            />
          </div>
        </div>
        <!-- 分類/單位 -->
        <div class="flex gap-2">
          <div class="w-full">
            <label for="category" class="text-xl"><span class="text-red-500">*</span>分類</label>
            <input
              type="text"
              id="category"
              v-model="data.category"
              class="mb-3 input"
              :class="errorClass('category')"
              @blur="errorType = ''"
            />
          </div>
          <div class="w-full">
            <label for="unit" class="text-xl"><span class="text-red-500">*</span>單位</label>
            <input
              type="text"
              id="unit"
              v-model="data.unit"
              class="input"
              :class="errorClass('unit')"
              @blur="errorType = ''"
            />
          </div>
        </div>
        <!-- 內容說明/上架 -->
        <div class="mb-1">
          <label for="content" class="text-xl"><span class="text-red-500">*</span>內容說明</label>
          <textarea
            type="text"
            id="content"
            class="input h-[140px]"
            v-model="data.content"
            :class="errorClass('content')"
            @blur="errorType = ''"
          />
        </div>
        <div class="">
          <label for="enabled" class="mr-1 text-xl">上架</label>
          <input
            type="checkbox"
            id="enabled"
            v-model="data.is_enabled"
            :checked="data.is_enabled"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <base-btn red-outline class="mr-2" @click="clearForm" v-if="addProductModel">清除</base-btn>
      <base-btn submit>送出</base-btn>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    addProductModel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['product-from-data'],
  data() {
    return {
      data: {
        title: '',
        category: '',
        origin_price: null,
        price: null,
        unit: '',
        description: '',
        content: '',
        is_enabled: false,
        imageUrl: '',
        imagesUrl: [],
        id: '',
      },
      errorType: '',
    };
  },
  methods: {
    submitFrom() {
      this.errorType = '';
      const url = /\b(?:(?:https?|http):\/\/|www\.)[-a-z0-9+&@#%?=~_|!:,.;]*[-a-z0-9+&@#%=~_|]/i;

      if (this.data.imageUrl === '' || !url.test(this.data.imageUrl)) {
        this.errorType = 'imageUrl';
        return;
      }
      if (this.data.title.value === '') {
        this.errorType = 'title';
        return;
      }
      if (this.data.origin_price === '' || this.data.origin_price <= 0) {
        this.errorType = 'originPrice';
        return;
      }
      if (this.data.price === '' || this.data.price <= 0) {
        this.errorType = 'price';
        return;
      }
      if (this.data.category === '') {
        this.errorType = 'category';
        return;
      }
      if (this.data.unit === '') {
        this.errorType = 'unit';
        return;
      }
      if (this.data.content === '') {
        this.errorType = 'content';
        return;
      }
      for (let item = 0; item < 5; item += 1) {
        const imageNumber = `imagesUrl${item}`;
        console.log(this.data.imagesUrl[imageNumber]);
        if (this.data.imagesUrl[imageNumber] !== undefined) {
          if (!url.test(this.data.imagesUrl[imageNumber])) {
            this.errorType = `imagesUrl${item}`;
            return;
          }
        }
      }
      this.data.is_enabled = this.data.is_enabled ? 1 : 0;
      this.$emit('product-from-data', this.data);
      this.clearForm();
    },
    errorClass(type) {
      if (this.errorType === type) {
        return 'border-red-400';
      }
      return 'border-gray-400';
    },
    clearForm() {
      if (this.addProductModel) {
        this.data = {
          title: '',
          category: '',
          origin_price: null,
          price: null,
          unit: '',
          description: '',
          content: '',
          is_enabled: false,
          imageUrl: '',
          imagesUrl: [],
          id: '',
        };
        this.errorType = '';
      }
    },
    getEditProductData() {
      const product = this.$store.getters['backstageProducts/editProductData'];
      this.data = product;
    },
  },
  mounted() {
    const product = this.$store.getters['backstageProducts/editProductData'];
    if (product && !this.addProductModel) {
      this.getEditProductData();
    }
  },
};
</script>

<style lang="postcss" scoped>
.input {
  @apply w-full px-2 py-1 mt-2 bg-gray-200 border-2 rounded-md;
}
</style>
