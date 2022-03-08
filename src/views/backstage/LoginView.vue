<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-80px)]">
    <section class="container max-w-[540px]">
      <h1 class="mb-6 text-4xl font-bold text-center">管理員登入</h1>
      <form action="" @submit.prevent="submitForm">
        <p v-show="email.isValue" class="mb-1 text-red-400">請輸入 Email</p>
        <input
          type="email"
          placeholder="Enter email"
          class="w-full px-3 py-4 mb-3 bg-gray-200 border-2 border-gray-400 rounded-md"
          :class="{ 'border-red-300': email.isValue }"
          v-model="email.value"
          @blur="email.isValue = false"
        />
        <p v-show="password.isValue" class="mb-1 text-red-400">請輸入密碼</p>
        <input
          type="password"
          placeholder="Enter password"
          class="w-full px-3 py-4 mb-3 bg-gray-200 border-2 border-gray-400 rounded-md"
          :class="{ 'border-red-300': password.isValue }"
          v-model="password.value"
          @blur="password.isValue = false"
        />
        <base-btn class="w-full h-[55px]" submit>登入</base-btn>
      </form>
    </section>
  </div>
  <!-- loading -->
  <base-loading :show="isLoading"></base-loading>
  <!-- error -->
  <base-dialog :show="!!error" title="Error" @close="closeError">
    {{ error }}
  </base-dialog>
</template>

<script>
export default {
  data() {
    return {
      email: {
        isValue: false,
        value: '',
      },
      password: {
        isValue: false,
        value: '',
      },
      error: null,
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      if (this.email.value === '' || !this.email.value.includes('@')) {
        this.email.isValue = true;
        return;
      }
      if (this.password.value === '') {
        this.password.isValue = true;
        return;
      }

      try {
        this.isLoading = true;
        const auth = {
          data: {
            username: this.email.value,
            password: this.password.value,
          },
        };
        await this.$store.dispatch('backstageAuth/login', auth);
        this.$router.replace('/admin/products');
      } catch (err) {
        this.error = err.message;
        this.isLoading = false;
      }
    },
    closeError() {
      this.error = null;
    },
  },
};
</script>
