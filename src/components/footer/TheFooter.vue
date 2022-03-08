<template>
  <footer class="bg-[#40916C] w-full px-2">
    <div
      class="container flex justify-center py-2 mx-auto text-white"
      :class="{ relative: !adminLogin }"
    >
      <div class="flex" :class="centerClass">
        <a href="https://discordapp.com/users/868355995334737961" class="mr-2 underline">SYUAN</a>
        <p>2022 Vue 直播班作品</p>
      </div>
      <router-link to="/admin/order" class="ml-auto underline" v-if="!adminLogin">
        <p>管理員登入</p>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    adminLogin: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    centerClass() {
      if (!this.adminLogin) {
        return ['absolute', 'left-2/4', '-translate-x-2/4'];
      }
      return '';
    },
  },
};
</script>
