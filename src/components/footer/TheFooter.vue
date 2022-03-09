<template>
  <footer class="bg-[#40916C] w-full px-2">
    <div
      class="container flex flex-col items-center py-2 mx-auto text-white lg:justify-content"
      :class="{ relative: !adminLogin }"
    >
      <div class="flex" :class="centerClass">
        <a href="https://discordapp.com/users/868355995334737961" class="mr-2 underline">SYUAN</a>
        <p>2022 Vue 直播班作品</p>
      </div>
      <router-link to="/admin/order" class="underline lg:ml-auto" v-if="!adminLogin">
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
        return ['lg:absolute', 'lg:left-2/4', 'lg:-translate-x-2/4'];
      }
      return '';
    },
  },
};
</script>
